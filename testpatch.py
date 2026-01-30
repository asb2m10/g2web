import g2api
import asyncio

x = asyncio.run(g2api.get_slot_info("a"))
print(x)