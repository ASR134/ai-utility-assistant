from httpx import AsyncClient
# pyrefly: ignore [missing-import]
from fastapi import HTTPException, status

# SDK uses python's function's name,type hints and documentation to construct tool schema that llm's api sees
async def get_weather(city : str) -> dict:
        """Get the current weather for a city.

        Args:
            city: The name of the city.
    
        Returns:
            A dictionary containing the city, temperature, wind speed,
            and weather code.
        """
        city = city.strip()

        geocoding_url = "https://geocoding-api.open-meteo.com/v1/search"

        geocoding_params = { # query parameters
            "name" : city,
            "count" : 1,
        }
    
        async with AsyncClient() as client:
            response = await client.get(
                geocoding_url,
                params=geocoding_params,
            )
    
            data = response.json()

            if not data.get("results"):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"city '{city}' not found",
                )

            
            location = data["results"][0]
    
            latitude = location["latitude"]
            longitude = location["longitude"]
    
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
    
            weather_data = weather_response.json()["current"]

            return weather_data