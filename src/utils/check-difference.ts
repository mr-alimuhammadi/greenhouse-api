import DateObject from "date-object";
import { AvrageMode } from "../types/avrage-mode";

export default function checkDifference(
  firstDate: DateObject,
  secondDate: DateObject,
  avrageMode: AvrageMode
) {
  if (secondDate >= firstDate)
    switch (avrageMode) {
      case "month":
        return new DateObject(firstDate).add(1, "month") >= secondDate;
      case "week":
        return new DateObject(firstDate).add(7, "days") >= secondDate;
      case "day":
        return new DateObject(firstDate).add(1, "day") >= secondDate;
      case "six-hours":
        return new DateObject(firstDate).add(6, "hours") >= secondDate;
      case "hour":
        return new DateObject(firstDate).add(1, "hour") >= secondDate;
    }
  return false;
}
