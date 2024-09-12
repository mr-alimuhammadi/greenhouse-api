import DateObject from "date-object";
import newPersianDate from "./new-persian-date";

export default function dateToString(date: DateObject) {
  const today = newPersianDate()
    .setHour(0)
    .setMinute(0)
    .setSecond(0)
    .setMillisecond(0);

  if (today.year == date.year) {
    if (today.month.number == date.month.number) {
      if (today.day == date.day) return date.format("HH:mm");
      if (new DateObject(today).subtract(1, "day") <= date)
        return "دیروز " + date.format("HH:mm");
      if (new DateObject(today).subtract(7, "days") <= date)
        return date.weekDay.name + " " + date.format("HH:mm");
    }
    return date.format("MM/DD HH:mm");
  }
  return date.format("YYYY/MM/DD HH:mm");
}
