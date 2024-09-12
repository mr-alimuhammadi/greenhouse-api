import DateObject from "date-object";
const persian = require("date-object/calendars/cjs/persian");
var persian_fa = require("date-object/locales/cjs/persian_fa");

export default function newPersianDate() {
  return new DateObject({
    calendar: persian,
    locale: persian_fa,
  });
}
