import { getDay } from "date-fns";

export default function datetimeToDayOfWeek(date: Date) {
  switch (getDay(date)) {
    case 0:
      return "یکشنبه";
    case 1:
      return "دوشنبه";
    case 2:
      return "سه شبنه";
    case 3:
      return "چهارشنبه";
    case 4:
      return "پنجشنبه";
    case 5:
      return "جمعه";
    case 6:
      return "شنبه";
  }
}
