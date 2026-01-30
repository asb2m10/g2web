// G2 Parameter Definitions
// Converted from g2ools/nord/g2/params.py

export interface ParamDef {
  name: string;
  low: number;
  high: number;
  default: number;
  definitions: string[];
  comments: string;
  map: Record<string, string>[];
}

function createParamDef(
  name: string,
  low: number,
  high: number,
  defaultVal: number,
  definitions: string[],
  comments: string
): ParamDef {
  return {
    name,
    low,
    high,
    default: defaultVal,
    definitions,
    comments,
    map: [],
  };
}

function setupMap(param: ParamDef): void {
  param.map = [];
  for (const definition of param.definitions) {
    const map: Record<string, string> = {};
    for (const nmval of definition.split(',')) {
      const parts = nmval.split('~');
      if (parts.length === 2) {
        const val = parts[0].trim();
        const name = parts[1].trim().replace(/ /g, '_').toLowerCase();
        map[name] = val;
      }
    }
    param.map.push(map);
  }
}

export const params: ParamDef[] = [
  createParamDef('Dst_2', 0, 2, 0,
    ['0 ~ Out, 1 ~ Fx, 2 ~ Bus'],
    ''
  ),
  createParamDef('OffOn', 0, 1, 0,
    ['0 ~ Off, 1 ~ On'],
    ''
  ),
  createParamDef('Pad_1', 0, 1, 0,
    ['0 ~ 0 dB, 1 ~ +6 dB'],
    ''
  ),
  createParamDef('Dst_1', 0, 5, 0,
    ['0 ~ Out 1/2, 1 ~ Out 3/4, 2 ~ Fx 1/2, 3 ~ Fx 3/4, 4 ~ Bus 1/2, 5 ~ Bus 3/4'],
    ''
  ),
  createParamDef('FreqCoarse', 0, 127, 64,
    ['0 ~ -64, 64 ~ 0, 127 ~ +63', '0 ~ 8.1756 Hz, 64 ~ 329.63 Hz, 127 ~ 12.55 kHz', '0 ~ x0.0248, 64 ~ x1.0000, 127 ~ x38.055', '0 ~ 0 Hz, 64 ~ 1:1, 127 ~ 64:1'],
    'Modes : Semi, Freq, Fac and Part'
  ),
  createParamDef('FreqFine', 0, 127, 64,
    ['0 ~ -50.0, 64 ~ +0.0, 127 ~ +49.2'],
    'In cents'
  ),
  createParamDef('Level_100', 0, 127, 0,
    ['0 ~ 0, 64 ~ 50, 127 ~ 100'],
    'Can be used to denote a (not necessarily linear) 0 .. 100 range or a percentage'
  ),
  createParamDef('FreqMode_3', 0, 3, 0,
    ['0 ~ Semi, 1 ~ Freq, 2 ~ Fac, 3 ~ Part'],
    ''
  ),
  createParamDef('PW', 0, 127, 0,
    ['0 ~ 50%, 127 ~ 99%'],
    ''
  ),
  createParamDef('OscBWaveform', 0, 4, 0,
    ['0 ~ Sine, 1 ~ Tri, 2 ~ Saw, 3 ~ Pulse, 4 ~ DualSaw'],
    ''
  ),
  createParamDef('FmLinTrk', 0, 1, 0,
    ['0 ~ Lin, 1 ~ Trk'],
    ''
  ),
  createParamDef('OscWaveform_3', 0, 7, 0,
    ['0 ~ Sine1, 1 ~ Sine2, 2 ~ Sine3, 4 ~ TriSaw, 5 ~ DoubleSaw, 6 ~ Pulse, 7 ~ SymPuls'],
    ''
  ),
  createParamDef('OscWaveform_2', 0, 5, 0,
    ['0 ~ Sine, 1 ~ Tri, 2 ~ Saw, 3 ~ Square, 4 ~ Pulse 25%, 5 ~ Pulse 10%'],
    ''
  ),
  createParamDef('ReverbTime', 0, 127, 0,
    ['0 ~ 0.0ms, 127 ~ 3.000s', '0 ~ 0.0ms, 127 ~ 6.000s', '0 ~ 0.0ms, 127 ~ 9.000s', '0 ~ 0.0ms, 127 ~ 12.00s'],
    'Small, Medium, Large, Hall. Determined by [RoomType]'
  ),
  createParamDef('RoomType', 0, 3, 0,
    ['0 ~ Small, 1 ~ Medium, 2 ~ Large, 3 ~ Hall'],
    'Determines ranges for [ReverbTime]'
  ),
  createParamDef('sw_3', 0, 7, 0,
    ['0 ~ sw1, 1 ~ sw2, 2 ~ sw3, 3 ~ sw4, 4 ~ sw5, 5 ~ sw6, 6 ~ sw7, 7 ~ sw8'],
    ''
  ),
  createParamDef('ValSwVal', 0, 63, 0,
    ['0 ~ 0, 62 ~ 62, 63 ~ 64'],
    ''
  ),
  createParamDef('Bipolar_127', 0, 127, 0,
    ['0 ~ -64, 64 ~ 0, 127 ~ 64'],
    'not necessarily a linear control'
  ),
  createParamDef('LogLin', 0, 1, 0,
    ['0 ~ Log, 1 ~ Lin'],
    ''
  ),
  createParamDef('MixLevel', 0, 127, 0,
    ['0 ~ 0, 64 ~ 50, 127 ~ 100', '0 ~ 0, 64 ~ 50, 127 ~ 100', '0 ~ -{00}, 64 ~ -17.6, 127 ~ -0'],
    'Lin, Exp, dB'
  ),
  createParamDef('ExpLin_2', 0, 2, 0,
    ['0 ~ Exp, 1 ~ Lin, 2 ~ dB'],
    ''
  ),
  createParamDef('EnvShape_3', 0, 3, 0,
    ['0 ~ LogExp, 1 ~ LinExp, 2 ~ ExpExp, 3 ~ LinLin'],
    ''
  ),
  createParamDef('EnvTime', 0, 127, 0,
    ['0 ~ 0.5m, 127 ~ 45.0s'],
    ''
  ),
  createParamDef('EnvLevel', 0, 127, 0,
    ['0 ~ 0.0, 126 ~ 63.0, 127 ~ 64.0'],
    ''
  ),
  createParamDef('PosNegInvBipInv', 0, 5, 0,
    ['0 ~ Pos, 1 ~ PosInv, 2 ~ Neg, 3 ~ NegInv, 4 ~ Bip, 5 ~ BipInv'],
    ''
  ),
  createParamDef('EnvNR', 0, 1, 0,
    ['0 ~ Normal, 1 ~ Reset'],
    ''
  ),
  createParamDef('PartialRange', 0, 127, 0,
    ['0 ~ {+-}0, 1 ~ {+-}0, 64 ~ {+-}32, 65 ~ {+-}32*, 126 ~ {+-}63*, 126 ~ {+-}63*'],
    '* clipped at {+-}32 and the lowest bit is not effective'
  ),
  createParamDef('LfoRate_3', 0, 127, 1,
    ['0 ~ 699s, 127 ~ 5.46s', '1 ~ 62.9s, 127 ~ 24.4 Hz', '2 ~ 0.26 Hz, 127 ~ 392 Hz', '3 ~ 24, 127 ~ 214'],
    'Sub, Lo, Hi, BPM (BPM is the same as for RateBpm). Determined by [LfoRange_3]'
  ),
  createParamDef('PolyMono', 0, 1, 0,
    ['0 ~ Poly, 1 ~ Mono'],
    ''
  ),
  createParamDef('OutTypeLfo', 0, 5, 4,
    ['0 ~ Pos, 1 ~ PosInv, 2 ~ Neg, 3 ~ NegInv, 4 ~ Bip, 5 ~ BipInv'],
    ''
  ),
  createParamDef('LfoRange_3', 0, 3, 1,
    ['0 ~ Rate Sub, 1 ~ Rate Lo, 2 ~ Rate Hi, 3 ~ BPM'],
    'Determines [LfoRate_3]'
  ),
  createParamDef('LfoWaveform_1', 0, 7, 0,
    ['0 ~ Sine, 1 ~ Tri, 2 ~ Saw, 3 ~ Square, 4 ~ RndStep, 5 ~ Rnd, 6 ~ RndPulse, 7 ~ RndRoundedPulse'],
    ''
  ),
  createParamDef('LfoRate_4', 0, 127, 1,
    ['0 ~ 699s, 127 ~ 5.46s', '1 ~ 62.9s, 127 ~ 24.4 Hz', '2 ~ 0.26 Hz, 127 ~ 392 Hz', '3 ~ 24, 127 ~ 214', '4 ~ 64/1, 64 ~ 1/4D, 127 ~ 1/64T'],
    'Sub, Lo, Hi, BPM, Clock (BPM is the same as for RateBpm). Determined by [LfoRange_4]'
  ),
  createParamDef('LfoRange_4', 0, 4, 0,
    ['0 ~ Rate Sub, 1 ~ Rate Lo, 2 ~ Rate Hi, 3 ~ BPM, 4 ~ Clock'],
    'Determines [LfoRate_4]'
  ),
  createParamDef('Kbt_1', 0, 4, 1,
    ['0 ~ Off, 1 ~ On'],
    ''
  ),
  createParamDef('Kbt_4', 0, 4, 0,
    ['0 ~ Off, 1 ~ 25%, 2 ~ 50%, 3 ~ 75%, 4 ~ 100%'],
    ''
  ),
  createParamDef('LfoShpAPW', 0, 127, 0,
    ['0 ~ 1%, 64 ~ 50%, 127 ~ 98%'],
    ''
  ),
  createParamDef('Phase', 0, 127, 0,
    ['0 ~ 0, 64 ~ 180, 127 ~ 357'],
    'In degrees, 360 degrees in a full circle'
  ),
  createParamDef('LfoShpA__Waveform', 0, 5, 0,
    ['0 ~ Sine, 1 ~ CosBell, 2 ~ TriBell, 3 ~ Saw2Tri, 4 ~ Sqr2Tri, 5 ~ Sqr'],
    ''
  ),
  createParamDef('LfoA_Waveform', 0, 5, 0,
    ['0 ~ Sine, 1 ~ Tri, 2 ~ Saw, 3 ~ Aqr, 4 ~ RndStep, 5 ~ Rnd'],
    ''
  ),
  createParamDef('FreqMode_2', 0, 2, 0,
    ['0 ~ Semi, 1 ~ Freq, 2 ~ Fac'],
    ''
  ),
  createParamDef('SaturateCurve', 0, 3, 0,
    ['0 ~ 1, 1 ~ 2, 2 ~ 3, 3 ~ 4'],
    ''
  ),
  createParamDef('NoiseColor', 0, 127, 0,
    ['0 ~ 0 (White), 64 ~ 50, 127 ~ 100 (Colored)'],
    ''
  ),
  createParamDef('EqdB', 64, 127, 0,
    ['0 ~ -18.0 dB, 64 ~ 0.0 dB, 127 ~ 18.0 dB'],
    ''
  ),
  createParamDef('EqLoFreq', 0, 2, 0,
    ['0 ~ 80 Hz, 1 ~ 110 Hz, 2 ~ 160 Hz'],
    ''
  ),
  createParamDef('EqHiFreq', 0, 2, 0,
    ['0 ~ 6 kHz, 1 ~ 8 kHz, 2 ~ 12 kHz'],
    ''
  ),
  createParamDef('EqMidFreq', 0, 127, 93,
    ['0 ~ 100 Hz, 64 ~ 910 Hz, 93 ~ 2.48 kHz, 127 ~ 8.00 kHz'],
    ''
  ),
  createParamDef('ShpExpCurve', 0, 3, 0,
    ['0 ~ x2, 1 ~ x3, 2 ~ x4, 3 ~ x5'],
    ''
  ),
  createParamDef('LogicTime', 0, 127, 1,
    ['0 ~ 0.10m, 127 ~ 1.00s', '0 ~ 1.04m, 127 ~ 10.0s', '0 ~ 10.4m, 127 ~ 100.0s'],
    'Sub, Lo, Hi. Determined by [LogicRange]'
  ),
  createParamDef('LogicRange', 0, 2, 0,
    ['0 ~ Sub, 1 ~ Lo, 2 ~ Hi'],
    'Determines [LogicTime]'
  ),
  createParamDef('PulseMode', 0, 1, 0,
    ['0 ~ Positive edge trigger, 1 ~ Negative edge trigger'],
    ''
  ),
  createParamDef('Pad_3', 0, 2, 0,
    ['0 ~ 0 dB, 1 ~ -6 dB, 2 ~ -12 dB'],
    ''
  ),
  createParamDef('PosNegInv', 0, 3, 0,
    ['0 ~ Pos, 1 ~ PosInv, 2 ~ Neg, 3 ~ NegInv'],
    ''
  ),
  createParamDef('LogicDelayMode', 0, 2, 0,
    ['0 ~ Positive edge delay, 1 ~ Negative edge delay, 2 ~ Cycle delay'],
    ''
  ),
  createParamDef('LevBipUni', 0, 127, 0,
    ['0 ~ -64, 64 ~ 0, 127 ~ 64', '0 ~ 0, 64 ~ 50, 127 ~ 100'],
    'Bip, Uni. Determined by [BipUni] setting'
  ),
  createParamDef('BipUni', 0, 1, 0,
    ['0 ~ Bip, 1 ~ Uni'],
    'Determines display for [LevBipUni]'
  ),
  createParamDef('Vowel', 0, 8, 0,
    ['0 ~ A, 1 ~ E, 2 ~ I, 3 ~ O, 4 ~ U, 5 ~ Y, 6 ~ AA, 7 ~ AE, 8 ~ OE'],
    ''
  ),
  createParamDef('FltFreq', 0, 127, 75,
    ['0 ~ 13.75 Hz, 64 ~ 554.4Hz, 75 ~ 1.05 kHz, 127 ~ 21.1 kHz'],
    ''
  ),
  createParamDef('Level_200', 0, 127, 0,
    ['0 ~ 0, 64 ~ 100, 127 ~ 200'],
    'Percentage'
  ),
  createParamDef('GcOffOn', 0, 1, 0,
    ['0 ~ GC Off, 1 ~ GC On'],
    ''
  ),
  createParamDef('Res_1', 0, 127, 0,
    ['0 ~ 0.50, 64 ~ 1.67, 127 ~ 50'],
    ''
  ),
  createParamDef('FltSlope_1', 0, 1, 1,
    ['0 ~ 6 dB/Oct, 1 ~ 12 dB/Oct'],
    ''
  ),
  createParamDef('FltSlope_2', 0, 1, 0,
    ['0 ~ 12 dB/Oct, 1 ~ 24 dB/Oct'],
    ''
  ),
  createParamDef('LpBpHpBr', 0, 3, 0,
    ['0 ~ LP, 1 ~ BP, 2 ~ HP, 3 ~ BR'],
    ''
  ),
  createParamDef('SustainMode_2', 0, 3, 2,
    ['0 ~ L1, 1 ~ L2, 2 ~ L3, 3 ~ Trg'],
    ''
  ),
  createParamDef('PosNegInvBip', 0, 4, 0,
    ['0 ~ Pos, 1 ~ PosInv, 2 ~ Neg, 3 ~ NegInv, 4 ~ Bip'],
    ''
  ),
  createParamDef('LpBpHp', 0, 2, 0,
    ['0 ~ LP, 1 ~ BP, 2 ~ HP'],
    ''
  ),
  createParamDef('MidiData', 0, 127, 0,
    ['0 ~ 0, 127 ~ 127'],
    'One to one mapping with MIDI data values'
  ),
  createParamDef('MidiCh_20', 0, 20, 0,
    ['0 ~ ch1, 1 ~ ch 2, 2 ~ ch3, 3 ~ ch4, 4 ~ ch5, 5 ~ ch6, 6 ~ ch7, 7 ~ ch8, 8 ~ ch9, 9 ~ ch10, 10 ~ ch11, 11 ~ ch12, 12 ~ ch13, 13 ~ ch14, 14 ~ ch15, 15 ~ ch16, 16 ~ This, 17 ~ Slot A, 18 ~ Slot B, 19 ~ Slot C, 20 ~ Slot D'],
    ''
  ),
  createParamDef('DrumSynthFreq', 0, 127, 42,
    ['0 ~ 20 Hz, 64 ~ 127 Hz, 127 ~ 784 Hz'],
    ''
  ),
  createParamDef('DrumSynthRatio', 0, 127, 15,
    ['0 ~ 1:1, 64 ~ x2.52, 127 ~ x6.26'],
    ''
  ),
  createParamDef('DrumSynthNoiseFlt', 0, 127, 57,
    ['0 ~ 10.30 Hz, 64 ~ 415.3 Hz, 127 ~ 15.8 kHz'],
    ''
  ),
  createParamDef('ClipShape', 0, 1, 0,
    ['0 ~ Asym, 1 ~ Sym'],
    ''
  ),
  createParamDef('OverdriveType', 0, 3, 0,
    ['0 ~ Soft, 1 ~ Hard, 2 ~ Fat, 3 ~ Heavy'],
    ''
  ),
  createParamDef('ScratchRatio', 0, 127, 80,
    ['0 ~ -x4.00, 64 ~ x0, 80 ~ x1.00, 127 ~ x4.00'],
    'negative speeds mean backwards playing'
  ),
  createParamDef('ScratchDelay', 0, 3, 2,
    ['0 ~ 12.5m, 1 ~ 25m, 2 ~ 50m, 3 ~ 100m'],
    'mili seconds'
  ),
  createParamDef('GateMode', 0, 5, 0,
    ['0 ~ AND, 1 ~ NAND, 2 ~ OR, 3 ~ NOR, 4 ~ XOR, 5 ~ XNOR'],
    ''
  ),
  createParamDef('MixInvert', 0, 1, 0,
    ['0 ~ Normal, 1 ~ Inverted'],
    ''
  ),
  createParamDef('RateBpm', 0, 127, 64,
    ['0 ~ 24 BPM, 64 ~ 120 BPM, 127 ~ 214 BPM'],
    ''
  ),
  createParamDef('InternalMaster', 0, 1, 0,
    ['0 ~ Internal, 1 ~ Master'],
    ''
  ),
  createParamDef('ClkGenBeatSync', 0, 5, 2,
    ['0 ~ 1, 1 ~ 2, 2 ~ 4, 3 ~ 8, 4 ~ 16, 5 ~ 32'],
    ''
  ),
  createParamDef('ClkGenSwing', 0, 127, 0,
    ['0 ~ 50.0%, 64 ~ 62.6%, 127 ~ 75.0%'],
    ''
  ),
  createParamDef('Range_128', 0, 127, 0,
    ['0 ~ 1, 127 ~ 128'],
    'Mapping of origin zero to origin one'
  ),
  createParamDef('ClkDivMode', 0, 1, 0,
    ['0 ~ Gated, 1 ~ Toggled'],
    "Gated mode follows input clock's positive pulse width"
  ),
  createParamDef('EnvFollowAttack', 0, 127, 0,
    ['0 ~ Fast, 1 ~ 0.53m, 64 ~ 23.0m, 127 ~ 1.00s'],
    ''
  ),
  createParamDef('EnvFollowRelease', 0, 127, 20,
    ['0 ~ 10.0m, 20 ~ 24.6m, 64 ~ 177m, 127 ~ 3.00s'],
    ''
  ),
  createParamDef('NoteRange', 0, 127, 0,
    ['0 ~ {+-}0, 1 ~ {+-}0.5, 64 ~ {+-}32, 126 ~ {+-}63.0, 127 ~ {+-}64.0'],
    ''
  ),
  createParamDef('NoteQuantNotes', 0, 127, 0,
    ['0 ~ Off, 1 ~ 1, 127 ~ 127'],
    ''
  ),
  createParamDef('sw_2', 0, 3, 0,
    ['0 ~ sw1, 1 ~ sw2, 2 ~ sw3, 3 ~ sw4'],
    ''
  ),
  createParamDef('LevAmpGain', 0, 127, 64,
    ['0 ~ x0.00, 64 ~ x1.00, 127 ~ x4.00'],
    ''
  ),
  createParamDef('LinDB', 0, 1, 0,
    ['0 ~ Lin, 1 ~ dB'],
    ''
  ),
  createParamDef('RectMode', 0, 3, 0,
    ['0 ~ Half wave positive, 1 ~ Half wave negative, 2 ~ Full wave positive, 3 ~ Full wave negative'],
    ''
  ),
  createParamDef('ShpStaticMode', 0, 3, 1,
    ['0 ~ Inv x3, 1 ~ Inv x2, 2 ~ x2, 3 ~ x3'],
    ''
  ),
  createParamDef('TrigGate', 0, 1, 0,
    ['0 ~ Trig, 1 ~ Gate'],
    ''
  ),
  createParamDef('AdAr', 0, 1, 0,
    ['0 ~ AD, 1 ~ AR'],
    'Selects between Decay and Release modes'
  ),
  createParamDef('Range_64', 0, 127, 0,
    ['0 ~ 0.0, 1 ~ 0.5, 64 ~ 32.0, 126 ~ 63.0, 127 ~ 64.0'],
    ''
  ),
  createParamDef('HpLpSlopeMode', 0, 5, 0,
    ['0 ~ 6dB/Oct, 1 ~ 12 dB/Oct, 2 ~ 18 dB/Oct, 3 ~ 24 dB/Oct, 4 ~ 30 dB/Oct, 5 ~ 36 dB/Oct'],
    ''
  ),
  createParamDef('FlangerRate', 0, 127, 64,
    ['0 ~ 0.01 Hz, 64 ~ 1.46 Hz, 127 ~ 2.91 Hz'],
    ''
  ),
  createParamDef('Sw_1', 0, 1, 0,
    ['0 ~ sw1, 1 ~ sw2'],
    ''
  ),
  createParamDef('FlipFlopMode', 0, 1, 0,
    ['0 ~ D type, 1 ~ SR type'],
    ''
  ),
  createParamDef('ClassicSlope', 0, 2, 0,
    ['0 ~ 12 dB/Oct, 1 ~ 18 dB/Oct, 2 ~ 24 dB/Oct'],
    ''
  ),
  createParamDef('OscA_Waveform', 0, 5, 2,
    ['0 ~ Sine, 1 ~ Tri, 2 ~ Saw, 3 ~ Square, 4 ~ Pulse 25%, 5 ~ Pulse 10%'],
    ''
  ),
  createParamDef('FreqShiftFreq', 0, 127, 0,
    ['0 ~ 0.000 Hz, 64 ~ 1.12 Hz, 127 ~ 8.78 Hz', '0 ~ 0.000 Hz, 64 ~ 12.5 Hz, 127 ~ 97.6 Hz', '0 ~ 0.000 Hz, 64 ~ 201 Hz, 127 ~ 1568 Hz'],
    'Sub, Lo, Hi. Determined by [FreqShiftRange]'
  ),
  createParamDef('FreqShiftRange', 0, 2, 0,
    ['0 ~ Sub, 1 ~ Lo, 2 ~ Hi'],
    'Determines [FreqShiftFreq] range'
  ),
  createParamDef('Freq_2', 0, 127, 64,
    ['0 ~ 100.0 Hz, 64 ~ 1.29 kHz, 127 ~ 16.0 kHz'],
    ''
  ),
  createParamDef('FltPhaseNotchCount', 0, 5, 2,
    ['0 ~ 1, 1 ~ 2, 2 ~ 3, 3 ~ 4, 4 ~ 5, 5 ~ 6'],
    ''
  ),
  createParamDef('FltPhaseType', 0, 2, 0,
    ['0 ~ Notch, 1 ~ Peak, 2 ~ Deep'],
    ''
  ),
  createParamDef('Freq_3', 0, 127, 60,
    ['0 ~ 20.00 Hz, 60 ~ 470.5 Hz, 64 ~ 580.8 Hz, 127 ~ 16.0 kHz'],
    ''
  ),
  createParamDef('EqPeakBandwidth', 0, 127, 64,
    ['0 ~ 2.00 Oct, 64 ~ 1.00 Oct, 127 ~ 0.02 Oct'],
    ''
  ),
  createParamDef('VocoderBand', 0, 16, 0,
    ['0 ~ Off, 1 ~ 1, 2 ~ 2, 3 ~ 3, 4 ~ 4, 5 ~ 5, 6 ~ 6, 7 ~ 7, 8 ~ 8, 9 ~ 9, 10 ~ 10, 11 ~ 11, 12 ~ 12, 13 ~ 13, 14 ~ 14, 15 ~ 15, 16 ~ 16'],
    ''
  ),
  createParamDef('ActiveMonitor', 0, 1, 1,
    ['0 ~ Monitor, 1 ~ Active'],
    ''
  ),
  createParamDef('Fade12Mix', 0, 127, 64,
    ['0 ~ O1:127, 64 ~ Mute, 127 ~ O2:127'],
    ''
  ),
  createParamDef('Fade21Mix', 0, 127, 64,
    ['0 ~ I1:127, 64 ~ Mute, 127 ~ I2:127'],
    ''
  ),
  createParamDef('LevScaledB', 0, 127, 64,
    ['0 ~ -8.0 dB, 64 ~ 0.0 dB, 127 ~ 8.0 dB'],
    ''
  ),
  createParamDef('LevModAmRm', 0, 127, 64,
    ['0 ~ None, 64 ~ AM, 127 ~ RM'],
    ''
  ),
  createParamDef('DigitizerBits', 0, 12, 11,
    ['0 ~ 1, 1 ~ 2, 2 ~ 3, 3 ~ 4, 4 ~ 5, 5 ~ 6, 6 ~ 7, 7 ~ 8, 8 ~ 9, 9 ~ 10, 10 ~ 11, 11 ~ 12, 12 ~ Off'],
    ''
  ),
  createParamDef('DigitizerRate', 0, 127, 64,
    ['0 ~ 32.70 Hz, 64 ~ 1.32 kHz, 127 ~ 50.2 kHz'],
    ''
  ),
  createParamDef('SustainMode_1', 0, 1, 1,
    ['0 ~ L1, 1 ~ L2'],
    ''
  ),
  createParamDef('LoopOnce', 0, 1, 1,
    ['0 ~ Once, 1 ~ Loop'],
    ''
  ),
  createParamDef('SeqLen', 0, 15, 0,
    ['0 ~ 1, 1 ~ 2, 2 ~ 3, 3 ~ 4, 4 ~ 5, 5 ~ 6, 6 ~ 7, 7 ~ 8, 8 ~ 9, 9 ~ 10, 10 ~ 11, 11 ~ 12, 12 ~ 13, 13 ~ 14, 14 ~ 15, 15 ~ 16'],
    ''
  ),
  createParamDef('Pad_2', 0, 1, 0,
    ['0 ~ 0 dB, 1 ~ -6 dB'],
    ''
  ),
  createParamDef('Source_1', 0, 1, 0,
    ['0 ~ FX 1/2, 1 ~ FX 3/4'],
    ''
  ),
  createParamDef('Pad_4', 0, 3, 1,
    ['0 ~ -12 dB, 1 ~ -6 dB, 2 ~ 0 dB, 3 ~ +6 dB'],
    ''
  ),
  createParamDef('MidiCh_16', 0, 16, 0,
    ['0 ~ ch1, 1 ~ ch 2, 2 ~ ch3, 3 ~ ch4, 4 ~ ch5, 5 ~ ch6, 6 ~ ch7, 7 ~ ch8, 8 ~ ch9, 9 ~ ch10, 10 ~ ch11, 11 ~ ch12, 12 ~ ch13, 13 ~ ch14, 14 ~ ch15, 15 ~ ch16, 16 ~ This'],
    ''
  ),
  createParamDef('MidiCh_17', 0, 17, 0,
    ['0 ~ ch1, 1 ~ ch2, 2 ~ ch3, 3 ~ ch4, 4 ~ ch5, 5 ~ ch6, 6 ~ ch7, 7 ~ ch8, 8 ~ ch9, 9 ~ ch10, 10 ~ ch11, 11 ~ ch12, 12 ~ ch13, 13 ~ ch14, 14 ~ ch15, 15 ~ ch16, 16 ~ This, 17 ~ keyb'],
    ''
  ),
  createParamDef('NoteZoneThru', 0, 1, 0,
    ['0 ~ Notes Only, 1 ~ Note+Ctrls'],
    ''
  ),
  createParamDef('Threshold_42', 0, 42, 18,
    ['0 ~ -30 dB, 18 ~ -12 dB, 42 ~ Off'],
    ''
  ),
  createParamDef('CompressorRatio', 0, 66, 20,
    ['0 ~ 1.0:1, 20 ~ 4.0:1, 66 ~ 80:1'],
    ''
  ),
  createParamDef('CompressorAttack', 0, 127, 1,
    ['0 ~ Fast, 1 ~ 0.53 m, 64 ~ 20.2 m, 127 ~ 767 m'],
    ''
  ),
  createParamDef('CompressorRelease', 0, 127, 20,
    ['0 ~ 125 m, 20 ~ 250 m, 64 ~ 1.15 s, 127 ~ 10.2 s'],
    ''
  ),
  createParamDef('CompressorRefLevel', 0, 42, 30,
    ['0 ~ -30 dB, 30 ~ 0 dB, 42 ~ 12 dB'],
    ''
  ),
  createParamDef('KeyQuantCapture', 0, 1, 0,
    ['0 ~ Closest, 1 ~ Evenly'],
    ''
  ),
  createParamDef('SeqCtrlXFade', 0, 3, 0,
    ['0 ~ Off, 1 ~ 25%, 2 ~ 50%, 3 ~ 100%'],
    ''
  ),
  createParamDef('BipPosNeg', 0, 2, 0,
    ['0 ~ Bip, 1 ~ Pos, 2 ~ Neg'],
    ''
  ),
  createParamDef('GlideTime', 0, 127, 64,
    ['0 ~ 0.2 m, 64 ~ 511 m, 127 ~ 22.4s', '0 ~ 0.2 ms/Oct, 64 ~ 480 ms/Oct, 127 ~ 23.5 s/Oct'],
    'Log, Lin. Determined by the Shape parameter ([LogLin])'
  ),
  createParamDef('Freq_1', 0, 127, 64,
    ['0 ~ 8.1758 Hz, 64 ~ 329.63 Hz, 127 ~ 12.55 kHz'],
    ''
  ),
  createParamDef('CombType', 0, 2, 0,
    ['0 ~ Notch, 1 ~ Peak, 2 ~ Deep'],
    ''
  ),
  createParamDef('OscShpA_Waveform', 0, 5, 0,
    ['0 ~ Sine1, 1 ~ Sine2, 2 ~ Sine3, 3 ~ Sine4, 4 ~ TriSaw, 5 ~ SymPulse'],
    ''
  ),
  createParamDef('DxAlgorithm', 0, 31, 0,
    ['0 ~ 1, 31 ~ 32'],
    ''
  ),
  createParamDef('DxFeedback', 0, 7, 0,
    ['0 ~ 0, 1 ~ 1, 2 ~ 2, 3 ~ 3, 4 ~ 4, 5 ~ 5, 6 ~ 6, 7 ~ 7'],
    ''
  ),
  createParamDef('PShiftCoarse', 0, 127, 64,
    ['1 ~ -16.0, 64 ~ +0.0, 127 ~ +15.8'],
    'Semitones'
  ),
  createParamDef('PShiftFine', 0, 127, 64,
    ['1 ~ -50, 64 ~ +0, 127 ~ +49.2'],
    'Cents ?'
  ),
  createParamDef('Source_2', 0, 3, 0,
    ['0 ~ In 1/2, 1 ~ In 3/4, 2 ~ Bus 1/2, 3 ~ Bus 3/4'],
    ''
  ),
  createParamDef('Source_3', 0, 1, 0,
    ['0 ~ In, 1 ~ Bus'],
    ''
  ),
  createParamDef('DelayTime_3', 0, 127, 0,
    [
      '0 ~ 0.01 m, 64 ~ 2.68 m, 127 ~ 5.30 m',
      '0 ~ 0.01 m, 64 ~ 12.7 m, 127 ~ 25.1 m',
      '0 ~ 0.01 m, 64 ~ 50.7 m, 127 ~ 101 m',
      '0 ~ 0.01 m, 64 ~ 252 m, 127 ~ 500 m',
      '0 ~ 0.01 m, 64 ~ 504 m, 127 ~ 1.000 s',
      '0 ~ 0.01 m, 64 ~ 1.008 s, 127 ~ 2.000 s',
      '0 ~ 0.01 m, 64 ~ 1.361 s, 127 ~ 2.700 s',
      '0 ~ 1/64 T, 64 ~ 1/4 T, 127 ~ 2/1',
    ],
    'Time(5ms, 25ms, 100ms, 500ms, 1.0s, 2.0s, 2.7s), Clk. Determined by [DelayRange_3] and [TimeClk] (if present)'
  ),
  createParamDef('DelayRange_3', 0, 6, 0,
    ['0 ~ 5 m, 1 ~ 25 m, 2 ~ 100 m, 3 ~ 500 m, 4 ~ 1.0 s, 5 ~ 2.0 s, 6 ~ 2.7 s'],
    'Determines [DelayTime_3]'
  ),
  createParamDef('TimeClk', 0, 1, 0,
    ['0 ~ Time, 1 ~ Clk'],
    ''
  ),
  createParamDef('DelayTime_2', 0, 127, 0,
    [
      '0 ~ 0.01 m, 64 ~ 252 m, 127 ~ 500 m',
      '0 ~ 0.01 m, 64 ~ 504 m, 127 ~ 1.000 s',
      '0 ~ 0.01 m, 64 ~ 1.008 s, 127 ~ 2.000 s',
      '0 ~ 0.01 m, 64 ~ 1.361 s, 127 ~ 2.700 s',
      '0 ~ 1/64 T, 64 ~ 1/4 T, 127 ~ 2/1',
    ],
    'Time(500 ms, 1.0 s, 2.0 s, 2.7 s), Clk. Determined by [DelayRange_2] and by [TimeClk] (if present)'
  ),
  createParamDef('DelayRange_2', 0, 3, 0,
    ['0 ~ 500 m, 1 ~ 1.0 s, 2 ~ 2.0 s, 3 ~ 2.7 s'],
    'Possibly determines [DelayTime_1], [DelayTime_2] and [DelayTime_3]'
  ),
  createParamDef('RatioFixed', 0, 1, 0,
    ['0 ~ Ratio, 1 ~ Fixed'],
    ''
  ),
  createParamDef('OpFreqCoarse', 0, 31, 0,
    ['0 ~ 0, 31 ~ 31'],
    ''
  ),
  createParamDef('OpFreqFine', 0, 99, 0,
    ['0 ~ 0, 99 ~ 99'],
    ''
  ),
  createParamDef('OpFreqDetune', 0, 14, 0,
    ['0 ~ -7, 7 ~ 0, 14 ~ 7'],
    ''
  ),
  createParamDef('OpVel', 0, 7, 0,
    ['0 ~ 0, 7 ~ 7'],
    ''
  ),
  createParamDef('OpRateScale', 0, 7, 0,
    ['0 ~ 0, 7 ~ 7'],
    ''
  ),
  createParamDef('OpTime', 0, 99, 0,
    ['0 ~ 0, 99 ~ 99'],
    ''
  ),
  createParamDef('OpLevel', 0, 99, 0,
    ['0 ~ 0, 99 ~ 99'],
    ''
  ),
  createParamDef('OpAmod', 0, 7, 0,
    ['0 ~ 0, 7 ~ 7'],
    ''
  ),
  createParamDef('OpBrPpoint', 0, 99, 0,
    ['0 ~ 0, 99 ~ 99'],
    ''
  ),
  createParamDef('OpDepthMode', 0, 3, 0,
    ['0 ~ 0, 3 ~ 3'],
    ''
  ),
  createParamDef('OpDepth', 0, 99, 0,
    ['0 ~ 0, 99 ~ 99'],
    ''
  ),
  createParamDef('DelayTime_1', 0, 127, 0,
    [
      '0 ~ 0.01 m, 64 ~ 252 m, 127 ~ 500 m',
      '0 ~ 0.01 m, 64 ~ 504 m, 127 ~ 1.000 s',
      '0 ~ 0.01 m, 64 ~ 661 ms, 127 ~ 1.351 s',
      '0 ~ 1/64 T, 64 ~ 1/4 T, 127 ~ 2/1',
    ],
    'Time(500 ms, 1.0 s, 1.35 s), Clk. Determined by [DelayRange_1] and by [TimeClk] (if present)'
  ),
  createParamDef('DelayRange_1', 0, 2, 0,
    ['0 ~ 500 m, 1 ~ 1.0 s, 2 ~ 2.0 s, 3 ~ 1.35 s'],
    'Determines [DelayTime_1]'
  ),
  createParamDef('OscWaveform_1', 0, 1, 0,
    ['0 ~ Sine, 1 ~ Tri'],
    ''
  ),
  createParamDef('Threshold_127', 0, 127, 0,
    ['0 ~ -{00}, 64 ~ -6.0 dB, 127 ~ -0 dB'],
    ''
  ),
  createParamDef('NoiseGateAttack', 0, 127, 0,
    ['0 ~ 0.2 m, 64 ~ 28.0 m, 127 ~ 100 m'],
    ''
  ),
  createParamDef('NoiseGateRelease', 0, 127, 64,
    ['0 ~ 0.50 m, 64 ~ 86.4 m, 127 ~ 1.00 s'],
    ''
  ),
  createParamDef('LfoB_Waveform', 0, 3, 0,
    ['0 ~ Sine, 1 ~ Tri, 2 ~ Saw, 3 ~ Square'],
    ''
  ),
  createParamDef('PhaserType', 0, 1, 0,
    ['0 ~ Type I, 1 ~ Type II'],
    ''
  ),
  createParamDef('PhaserFreq', 0, 127, 64,
    ['0 ~ 0.05 Hz, 64 ~ 2.98 Hz, 127 ~ 11.6 Hz'],
    ''
  ),
  createParamDef('ExpLin_1', 0, 1, 0,
    ['0 ~ Exp, 1 ~ Lin'],
    ''
  ),
  createParamDef('ModAmtInvert', 0, 1, 0,
    ['0 ~ m, 1 ~ 1-m'],
    ''
  ),
  createParamDef('MonoKeyMode', 0, 2, 0,
    ['0 ~ Last, 1 ~ Lo, 2 ~ Hi'],
    ''
  ),
  createParamDef('RndEdge', 0, 4, 0,
    ['0 ~ 0%, 1 ~ 25%, 2 ~ 50%, 3 ~ 75%, 4 ~ 100%'],
    ''
  ),
  createParamDef('RandomAStepProb', 0, 3, 0,
    ['0 ~ 25%, 1 ~ 50%, 2 ~ 75%, 3 ~ 100%'],
    ''
  ),
  createParamDef('Rnd_1', 0, 1, 0,
    ['0 ~ Rnd1, 1 ~ Rnd2'],
    ''
  ),
  createParamDef('RangeBip_128', 0, 127, 64,
    ['0 ~ -64, 64 ~ 0, 126 ~ 62, 127 ~ 64'],
    ''
  ),
  createParamDef('RndStepPulse', 0, 1, 0,
    ['0 ~ Step, 1 ~ Pulse'],
    ''
  ),
];

// Initialize maps for all parameters
for (const param of params) {
  setupMap(param);
}

// Create paramMap object for easy access by name
export const paramMap: Record<string, ParamDef> = {};
for (const param of params) {
  paramMap[param.name] = param;
}

// Helper function to get a parameter by name
export function getParam(name: string): ParamDef | undefined {
  return paramMap[name];
}

// Helper function to get the display value for a parameter
export function getDisplayValue(param: ParamDef, value: number, definitionIndex = 0): string | undefined {
  if (definitionIndex >= param.map.length) {
    definitionIndex = 0;
  }
  const map = param.map[definitionIndex];
  if (!map) return undefined;

  // Find exact match
  for (const [displayName, val] of Object.entries(map)) {
    if (parseInt(val) === value) {
      return displayName;
    }
  }
  return undefined;
}
