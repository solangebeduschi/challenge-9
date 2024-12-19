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
class HistoryService {
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

  private fs = require('fs');
  private path = require('path');
  private searchHistoryPath = this.path.resolve(__dirname, '../data/searchHistory.json');

  private async read() {
    return JSON.parse(this.fs.readFileSync(this.searchHistoryPath, 'utf8'));
  }

  private async write(cities: City[]) {
    this.fs.writeFileSync(this.searchHistoryPath, JSON.stringify(cities, null, 2));
  }

  async getCities() {
    const cities = await this.read();
    return cities;
  }

  async addCity(city: string) {
    const cities = await this.read();
    const cityId = cities.length + 1;
    cities.push(new City(cityId.toString(), city));
    await this.write(cities);
  }

  async removeCity(id: string) {
    let cities = await this.read();
    cities = cities.filter((city: { id: string; }) => city.id !== id);
    await this.write(cities);
  }

  


}

export default new HistoryService();
