import { MeasuresData } from "../types/measures-data";
import getWeightedRandom from "./get-weighted-random";

export default async function generateGreenhouseData(
  startDate: Date,
  endDate: Date,
  timeStepInMinutes: number
) {
  const data: MeasuresData[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const temperature = getWeightedRandom(-30.0, 99.9, 20, 50, 98);
    const humidity = getWeightedRandom(0.0, 99.9, 35, 85, 95);

    data.push({
      datetime: new Date(currentDate),
      temperature,
      humidity,
    });

    currentDate.setMinutes(currentDate.getMinutes() + timeStepInMinutes);
  }

  return data;
}
