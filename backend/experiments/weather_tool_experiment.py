import asyncio

from app.llm.client import weather_assistant


async def main():

    response = await weather_assistant("what is the weather of lucknow?")

    print(response.text)


if __name__ == "__main__":
    asyncio.run(main())