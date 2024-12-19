import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  temperature: number;
  conditions: string;
  conditionIcon: string;
  forecast: Weather[];

  constructor(city: string, temperature: number, conditions: string, conditionIcon: string, forecast: Weather[]) {
    this.city = city;
    this.temperature = temperature;
    this.conditions = conditions;
    this.conditionIcon = conditionIcon;
    this.forecast = forecast;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = 'https://api.weatherapi.com/v1';
    this.apiKey = process.env.WEATHER_API_KEY ?? '';
    this.cityName = '';
  }

  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await fetch(query);
    const locationData = await response.json();
    return locationData;
  }

  private destructureLocationData(locationData: any): Coordinates {
    const { lat, lon } = locationData;
    return { latitude: lat, longitude: lon };
  }

  private buildGeocodeQuery(): string {
    return `${this.baseURL}/current.json?key=${this.apiKey}&q=${this.cityName}`;
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast.json?key=${this.apiKey}&q=${coordinates.latitude},${coordinates.longitude}&days=3`;
  }

  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    return await response.json();
  }

  private parseCurrentWeather(response: any): Weather {
    const { current, location } = response;
    const { temp_c, condition, icon } = current;
    return new Weather(location.name, temp_c, condition.text, icon, []);
  }

  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map((data) => {
      const { day, condition, icon } = data;
      return new Weather(currentWeather.city, day.avgtemp_c, condition.text, icon, []);
    });
  }

  async getWeatherForCity(city: string): Promise<Weather> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    currentWeather.forecast = this.buildForecastArray(currentWeather, weatherData.forecast.forecastday);
    return currentWeather;
  }
}

export default new WeatherService();
