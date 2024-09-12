import { subMinutes, subYears } from "date-fns";
import generateGreenhouseData from "./generate-greenhouse-data";
import { Device } from "../types/device";

export default async function generateDevicesData() {
  const devices: Device[] = [];

  const today = new Date();
  today.setMilliseconds(0);
  today.setSeconds(0);
  const todayRoundedBy15 = subMinutes(today, today.getMinutes() % 15);
  const todayRoundedBy3 = subMinutes(today, today.getMinutes() % 15);
  const twoYearsAgoRoundedBy15 = subYears(todayRoundedBy15, 2);
  const twoYearsAgoRoundedBy3 = subYears(todayRoundedBy3, 2);

  devices.push({
    deviceId: 0,
    deviceName: "دستگاه 22001",
    deviceZone: "گلخانه ناحیه A",
    deviceData: await generateGreenhouseData(
      twoYearsAgoRoundedBy15,
      todayRoundedBy15,
      15
    ),
  });
  devices.push({
    deviceId: 1,
    deviceName: "دستگاه 22002",
    deviceZone: "گلخانه ناحیه B",
    deviceData: await generateGreenhouseData(
      twoYearsAgoRoundedBy3,
      todayRoundedBy3,
      3
    ),
  });
  devices.push({
    deviceId: 2,
    deviceName: "دستگاه 22003",
    deviceZone: "گلخانه ناحیه C",
    deviceData: await generateGreenhouseData(
      twoYearsAgoRoundedBy15,
      todayRoundedBy15,
      15
    ),
  });
  devices.push({
    deviceId: 3,
    deviceName: "دستگاه 22004",
    deviceZone: "گلخانه ناحیه D",
    deviceData: await generateGreenhouseData(
      twoYearsAgoRoundedBy3,
      todayRoundedBy3,
      3
    ),
  });
  devices.push({
    deviceId: 4,
    deviceName: "دستگاه 22005",
    deviceZone: "گلخانه ناحیه E",
    deviceData: await generateGreenhouseData(
      twoYearsAgoRoundedBy15,
      todayRoundedBy15,
      15
    ),
  });

  return devices;
}
