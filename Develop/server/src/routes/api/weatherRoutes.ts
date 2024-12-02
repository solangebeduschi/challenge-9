import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {

  // TODO: GET weather data from city name
  // TODO: save city to search history

  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ message: 'City name is required' });
    }

    const weatherData = await WeatherService.getWeatherForCity(city);

    await HistoryService.saveCity(city);
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.deleteCity(id);
    res.json({ message: 'City deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
