import asyncio
from httpx import AsyncClient

async def main():
    url = "https://geocoding-api.open-meteo.com/v1/search"

    params = { # query parameters
        "name" : "Delhi",
        "count" : 1,
    }

    async with AsyncClient() as client:
        response = await client.get(url,params=params)

        data = response.json()

        location = data["results"][0]

        latitude = location["latitude"]
        longitude = location["longitude"]

        print("Latitude:",latitude)
        print("Longitude:",longitude)

        # get weather using coordinates

        weather_url = "https://api.open-meteo.com/v1/forecast"

        weather_params = {
            "latitude" : latitude,
            "longitude" : longitude,
            "current" : "temperature_2m,wind_speed_10m,weather_code",
        }

        weather_response = await client.get(
            weather_url,
            params=weather_params,
        )

        weather_data = weather_response.json()

        print(weather_data["current"])

if __name__ == "__main__":
    asyncio.run(main())