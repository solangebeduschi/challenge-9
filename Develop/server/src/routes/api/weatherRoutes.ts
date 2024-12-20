import { Router } from 'express';
import type { Request, Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ message: 'City name is required' });
    }

    const weatherData = await WeatherService.getWeatherForCity(city);

    await HistoryService.saveCity(city);

    return res.json(weatherData);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
);

// TODO: GET weather data from city name
// TODO: save city to search history

  

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getHistory();
    res.json(history);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.deleteCity(id);
    res.json({ message: 'City deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
