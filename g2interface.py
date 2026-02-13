import struct
import usb
from usb.core import USBTimeoutError
from functools import reduce
from array import array

CMD_A    = 0x08
CMD_B    = 0x09
CMD_C    = 0x0a
CMD_D    = 0x0b
CMD_SYS  = 0x0c
CMD_INIT = 0x80
CMD_MASK = 0xf0
CMD_REQ  = 0x20
CMD_SEND = 0x30
CMD_RESP = 0x00

class UnsupportedMessage(Exception):
    def __init__(self, msg: str):
        super().__init__(msg)

class G2USBInterface:
    def __init__(self):
        vendorid, productid = 0xffc, 2 # clavia, g2

        # find g2 usb device
        g2dev = None
        for bus in usb.busses():
            for device in bus.devices:
                if device.idVendor == vendorid and device.idProduct == productid:
                    g2dev = device
        if not g2dev:
            raise Exception('No g2 device found')
        self.g2dev = g2dev

        # get 3 endpoints
        g2conf = g2dev.configurations[0]
        g2intf = g2conf.interfaces[0][0]
        g2eps = g2intf.endpoints
        self.g2iin  = g2eps[0].address
        self.g2bin  = g2eps[1].address
        self.g2bout = g2eps[2].address

        self.g2h = g2dev.open()
        self.g2h.setConfiguration(g2conf)
        self.g2h.reset()

    def read(self, addr, len, timeout=100):
        data = self.g2h.bulkRead(addr, len, timeout)
        return bytearray([ byte & 0xff for byte in data ])

    def wait_reply(self, timeout=100, data=None):
        din = self.bread(self.g2iin, 16, timeout)
        if len(din) == 0:
            return None

        # result message first byte:
        #   0xLT 0xDD 0xDD .. 0xDD 0xCC 0xCC (16 0xDD bytes)
        #   T: message type (1=extended message, 2=embedded message)
        #   L: embedded message length (<=0xf, always zero for extended message)
        #   0xDD
        s = hexdump(din).replace('\n','\n   ')
        debug('<%d %s\n', self.g2iin & 0x7f, s)

        if is_extended(din):
            return self.extended_message(din, data)
        elif is_embedded(din):
            return self.embedded_message(din, data)

        raise UnsupportedMessage('Unsupported message type: 0x%02x' % din[0])

    def send_wait_reply(self, data, type=CMD_REQ, timeout=1000):
        # flush any pending input
        try:
            while self.wait_reply(10) is not None:
                pass
        except Exception:
            pass

        packets = self.format_outbound_message(data, type)
        for packet in packets:
            self.write(self.g2bout, packet)
            s = hexdump(packet).replace('\n','\n   ')
            debug('>%d %s\n', self.g2bout & 0x7f, s)

        if type != CMD_REQ:
            return ''

        result = None
        for retries in range(5):
            result = self.wait_reply(timeout, data)
            if result is not None:
                break
            print("empty response, retrying...")

        return result

    # =======================================================================================================
    # REFACTORING SPACE
    # =======================================================================================================
    def format_outbound_message(self, data, type):
        # handle 0x80 (init) messages specially
        if data[0] == CMD_INIT:
            # message 0x80 is just itself
            s = data
        else:
            # messages start with 0x01 0xRC 0xDD 0xDD .. 0xDD
            # C: command (usually just the lower nibble)
            # R: 0x2 when request, 0x0 for response
            #    0x3 ? maybe response-less request
            # DD: data for command
            s = bytearray([0x01]+[data[0]|type]+data[1:])

        # messages are sent formatted as bytes:
        # SS SS MM MM MM .. MM CC CC
        # SS: Big endian 16-bit size of message
        # MM: Message (variable length)
        # CC: Big endian 16-bit crc of MM MM .. MM
        l = len(s)+4  # length includes SS SS and CC CC (add 4 bytes)
        c = crc(s)    # calculate the crc
        # encode and send the message to be sent
        ns = bytearray(struct.pack('>H%dsH' % len(s), l, bytes(s), c))
        # max message len 4096, break message into 4096 byte chunks
        return [ ns[i:i+4096] for i in range(0, len(ns), 4096) ]

    def extended_message(self, din, data):
        sz = (din[1]<<8)|din[2]
        bin = []
        retries = 5 # the message has to return within 5 tries
        while retries != 0 and sz != len(bin):
            bin = self.bread(self.g2bin, sz)
            retries -= 1
        s = hexdump(bin).replace('\n','\n   ')
        debug('<%d %s\n', self.g2bin & 0x7f, s)
        if retries == 0:
            raise Exception('Could not get result')
        elif bin[0] == CMD_INIT: # special case
            debug("message pass\n")
            pass
        elif bin[1] == data[0]: # if result is same as command we got message
            debug("duplicate message pass\n")
            pass
        else:
            return None

        ecrc = crc(bin[:-2]) # expected crc
        acrc = (bin[-2]<<8)|bin[-1]     # actual crc
        if ecrc != acrc:
            print('bad crc exp: 0x%04x act: 0x%04x\n', (ecrc, acrc))
        return bin

    def embedded_message(self, din, data):
        dil = din.pop(0)>>4 # length encoded in upper nibble of header byte
        ecrc = crc(din[:dil-2]) # expected crc
        acrc = (din[dil-2]<<8)|din[dil-1]  # actual crc
        if ecrc != acrc:
            print('bad crc exp: 0x%04x act: 0x%04x', (ecrc, acrc))
        return din[:dil]

    def send_message(self, data, type=CMD_REQ, timeout=100):
        packets = self.format_outbound_message(data, type)
        for packet in packets:
            self.write(self.g2bout, packet)
            s = hexdump(packet).replace('\n','\n   ')
            debug('>%d %s\n', self.g2bout & 0x7f, s)

        if type != CMD_REQ:
            return ''

        # retry 5 times or til the correct response is returned
        # which is usually the command without the request bit (0x20) set
        result = None
        for retries in range(5):
            din = self.bread(self.g2iin, 16, timeout)
            if len(din) == 0:
                print("empty response, retrying...")
                continue

            # result message first byte:
            #   0xLT 0xDD 0xDD .. 0xDD 0xCC 0xCC (16 0xDD bytes)
            #   T: message type (1=extended message, 2=embedded message)
            #   L: embedded message length (<=0xf, always zero for extended message)
            #   0xDD
            s = hexdump(din).replace('\n','\n   ')
            debug('<%d %s\n', self.g2iin & 0x7f, s)
            if is_extended(din):
                result = self.extended_message(din, data)
            elif is_embedded(din):
                result = self.embedded_message(din, data)

            if result:
                break

        return result

    def bread(self, addr, len, timeout=100):
        try:
            data = self.g2h.bulkRead(addr, len, timeout) # self.g2bin
            return bytearray([ byte & 0xff for byte in data ])
        except USBTimeoutError as e :
            print("timeout")
            return []

    def read(self, addr, len, timeout=100):
        return self.bread(addr, len, timeout)
    def write(self, addr, data):
        return self.g2h.bulkWrite(addr, data)

def debug(fmt, *a):
    if 1:
        print(fmt % (*a,))

def hexdump(bytes, addr=0, size=1):
    def out(x):
        if x < 32 or x >= 127:
            return '.'
        return chr(x)

    '''hexdump(bytes,addr,size) -> string
    return hex dump of size itmes using addr as address'''
    s = []
    if size == 4:
        type, fmt, l = 'I', '%08x', 17
    elif size == 2:
        type, fmt, l = 'H', '%04x', 19
    else:
        type, fmt, l = 'B', '%02x', 23
    a = array(type, bytes)
    ofmt = '%04x: %-*s  %-*s | %s'
    for off in range(0, len(bytes), 16):
        hex = [fmt % i for i in a[off//size:(off+16)//size]]
        s.append(ofmt % (addr+off,
                         l, ' '.join(hex[:8//size]), l, ' '.join(hex[8//size:]),
                         ''.join([out(byte) for byte in bytes[off:off+16]])))
    return '\n'.join(s)

def crc16(val, icrc):
    k = (((icrc>>8)^val)&0xff)<<8
    crc = 0
    for bits in range(8):
        if (crc^k)&0x8000 != 0:
            crc = (crc<<1)^0x1021
        else:
            crc <<= 1
        k <<= 1
    return (icrc<<8)^crc

def crc(s):
    return reduce(lambda a, b: crc16(b, a), s, 0) & 0xffff

def is_extended(data):
    return data[0] & 0xf == 1

def is_embedded(data):
    return data[0] & 0xf == 2
