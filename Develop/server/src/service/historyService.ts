import { promises as fs } from 'fs';
import path from 'path';


// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}


// TODO: Complete the HistoryService class

  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}

  class HistoryService {
    private searchHistoryPath: string;
  
    constructor() {
      // Dynamically resolve the path to `searchHistory.json`
      this.searchHistoryPath = path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        '../data/searchHistory.json'
      );
    }
  
    // Reads from `searchHistory.json`
    private async read(): Promise<City[]> {
      try {
        const data = await fs.readFile(this.searchHistoryPath, 'utf8');
        return JSON.parse(data) as City[];
      } catch (error) {
        // If the file does not exist or fails to read, return an empty array
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          return [];
        }
        throw error;
      }
    }
  
    // Writes to `searchHistory.json`
    private async write(cities: City[]): Promise<void> {
      await fs.writeFile(this.searchHistoryPath, JSON.stringify(cities, null, 2));
    }
  
    // Retrieves the list of cities
    async getCities(): Promise<City[]> {
      return await this.read();
    }
  
    // Adds a new city
    async addCity(cityName: string): Promise<City> {
      const cities = await this.read();
      const cityId = (cities.length + 1).toString();
      const newCity = new City(cityId, cityName);
      cities.push(newCity);
      await this.write(cities);
      return newCity;
    }
  
    // Removes a city by ID
    async removeCity(id: string): Promise<void> {
      const cities = await this.read();
      const updatedCities = cities.filter((city) => city.id !== id);
      await this.write(updatedCities);
    }
  
    // Retrieves search history (alias for `getCities`)
    async getHistory(): Promise<City[]> {
      return this.getCities();
    }
  
    // Saves a city (alias for `addCity`)
    async saveCity(cityName: string): Promise<City> {
      return this.addCity(cityName);
    }
  
    // Deletes a city by ID (alias for `removeCity`)
    async deleteCity(id: string): Promise<void> {
      await this.removeCity(id);
    }
  }
  
  export default new HistoryService();