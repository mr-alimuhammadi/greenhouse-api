import {
  differenceInDays,
  differenceInMonths,
  format,
  isAfter,
  isBefore,
} from "date-fns";
import { MeasuresData } from "../types/measures-data";
import datetimeToDayOfWeek from "./datetime-to-day-of-week";
import { AvrageMode } from "../types/avrage-mode";
import avrageMeasuresData from "./avrage-measures-data";

export default async function extractChartData(
  measuresData: MeasuresData[],
  fromDataTime: Date,
  toDataTime: Date,
  avrageMode: AvrageMode = "none"
) {
  const data = measuresData.filter(
    (e) => isAfter(e.datetime, fromDataTime) && isBefore(e.datetime, toDataTime)
  );

  if (avrageMode === "none") {
    if (differenceInDays(toDataTime, fromDataTime) <= 7) {
      return data.map((e) => ({
        datetime:
          datetimeToDayOfWeek(e.datetime) + " " + format(e.datetime, "HH:mm"),
        temperature: e.temperature,
        humidity: e.humidity,
      }));
    } else if (differenceInMonths(toDataTime, fromDataTime) <= 12) {
      return data.map((e) => ({
        datetime: format(e.datetime, "M/d HH:mm"),
        temperature: e.temperature,
        humidity: e.humidity,
      }));
    } else {
      return data.map((e) => ({
        datetime: format(e.datetime, "yyyy-MM-dd HH:mm"),
        temperature: e.temperature,
        humidity: e.humidity,
      }));
    }
  } else {
    const avragedData = avrageMeasuresData(data, avrageMode);
    if (differenceInDays(toDataTime, fromDataTime) <= 7) {
      return avragedData.map((e) => ({
        datetime:
          datetimeToDayOfWeek(e.datetimeRange[0]) +
          " " +
          format(e.datetimeRange[0], "HH:mm") +
          " to " +
          datetimeToDayOfWeek(e.datetimeRange[1]) +
          " " +
          format(e.datetimeRange[1], "HH:mm"),
        temperature: e.temperature,
        humidity: e.humidity,
      }));
    } else if (differenceInMonths(toDataTime, fromDataTime) <= 12) {
      return avragedData.map((e) => ({
        datetime:
          format(e.datetimeRange[0], "d/M HH:mm") +
          " to " +
          format(e.datetimeRange[1], "d/M HH:mm"),
        temperature: e.temperature,
        humidity: e.humidity,
      }));
    } else {
      return avragedData.map((e) => ({
        datetime:
          format(e.datetimeRange[0], "yyyy-MM-dd HH:mm") +
          " to " +
          format(e.datetimeRange[1], "yyyy-MM-dd HH:mm"),
        temperature: e.temperature,
        humidity: e.humidity,
      }));
    }
  }
}
