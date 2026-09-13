import asyncio

from app.llm.client import generate_text


async def main():

    response = await generate_text("what is carbon?")

    print(type(response.text))


if __name__ == "__main__":
    asyncio.run(main())