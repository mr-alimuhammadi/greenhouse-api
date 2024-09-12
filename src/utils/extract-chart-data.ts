import { isAfter, isBefore } from "date-fns";
import {
  MeasuresData,
  MeasuresDataInPersianDate,
} from "../types/measures-data";
import { AvrageMode } from "../types/avrage-mode";
import DateObject from "date-object";
import toPersianDate from "./to-persian-date";
import { ChartData } from "../types/chart-data";
import dateToString from "./date-to-string";
import checkDifference from "./check-difference";

export default async function extractChartData(
  measuresData: MeasuresData[],
  fromDataTime: DateObject,
  toDataTime: DateObject,
  avrageMode: AvrageMode = "none"
) {
  const fromJSDataTime = fromDataTime.toDate();
  const toJSDataTime = toDataTime.toDate();

  const chartData: ChartData[] = [];

  let avrageArray: MeasuresDataInPersianDate[] = [];
  let temperatureSum = 0;
  let humiditySum = 0;

  for (let i = 0; i < measuresData.length; i++) {
    const element = measuresData[i];
    if (
      isBefore(element.datetime, fromJSDataTime) ||
      isAfter(element.datetime, toJSDataTime)
    )
      continue;
    const elementInPersianDate: MeasuresDataInPersianDate = {
      datetime: toPersianDate(measuresData[i].datetime),
      temperature: measuresData[i].temperature,
      humidity: measuresData[i].humidity,
    };

    if (avrageMode === "none")
      chartData.push({
        datetime: dateToString(elementInPersianDate.datetime),
        temperature: elementInPersianDate.temperature,
        humidity: elementInPersianDate.humidity,
      });
    else {
      if (avrageArray.length == 0) avrageArray.push(elementInPersianDate);
      else if (
        checkDifference(
          avrageArray[0].datetime,
          elementInPersianDate.datetime,
          avrageMode
        )
      ) {
        avrageArray.push(elementInPersianDate);
      } else {
        avrageArray.forEach((element) => {
          temperatureSum += element.temperature;
          humiditySum += element.humidity;
        });
        chartData.push({
          datetime:
            "(" +
            dateToString(avrageArray[0].datetime) +
            ", " +
            dateToString(avrageArray.slice(-1)[0].datetime) +
            ")",
          temperature: parseFloat(
            (temperatureSum / avrageArray.length).toFixed(1)
          ),
          humidity: parseFloat((humiditySum / avrageArray.length).toFixed(1)),
        });
        temperatureSum = humiditySum = 0;
        avrageArray = [];
      }
    }
  }

  return chartData;
}
