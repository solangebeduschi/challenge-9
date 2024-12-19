## Weather Dashboard

# Description

The Weather Dashboard application allows users to retrieve and view current and future weather conditions for multiple cities. By leveraging the OpenWeather API, this application helps travelers plan their trips by providing accurate and detailed weather data. The application includes search functionality and maintains a history of previous searches.

# Features

Search for a city to view current and 5-day weather forecasts.

Display weather details including city name, date, weather icon, temperature, humidity, wind speed, and a description of the weather.

Save search history to a JSON file and display it in the application.

Click on a previously searched city to view its weather data again.

# User Story

I want to see the weather outlook for multiple cities.

So that I can plan a trip accordingly.


# Usage

Start the server:

npm start

Open your browser and navigate to:

http://localhost:3000

Search for a city to view its weather conditions.

# API Routes

HTML Routes

GET /: Returns the index.html file.

API Routes

GET /api/weather/history

Reads the searchHistory.json file and returns all saved cities as JSON.

POST /api/weather

Receives a city name in the request body.

Saves the city to the searchHistory.json file with a unique ID.

Returns associated weather data to the client.

DELETE /api/weather/history/:id (Bonus)

Deletes a city from searchHistory.json based on its unique ID.


# Technologies Used

Node.js

Express.js

OpenWeather API

Render for deployment

Bonus Features

Delete functionality: Allows users to remove cities from the search history.

GitHub: https://github.com/solangebeduschi/challenge-9

Render link: 





# License

This project is licensed under the MIT License.