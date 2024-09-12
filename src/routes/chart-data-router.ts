import express from "express";
import fs from "fs";
import path from "path";
import { DeviceData } from "../types/device-data";
import extractChartData from "../utils/extract-chart-data";
import { subDays } from "date-fns";
import { AvrageMode } from "../types/avrage-mode";
import DateObject from "date-object";
const persian = require("date-object/calendars/cjs/persian");

const chartDataRouter = express.Router();

chartDataRouter.get("/:deviceId", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "data", "devices-data.json"),
    "utf-8",
    (erorr, data) => {
      if (erorr) console.error(erorr);
      else {
        const devicesData = JSON.parse(data) as DeviceData[];
        const deviceData = devicesData.find(
          (device) => device.deviceId === parseInt(req.params.deviceId)
        );
        if (deviceData) {
          const today = new DateObject({ calendar: persian });
          const yesterday = new DateObject(today).subtract(1, "day");
          extractChartData(deviceData.deviceData, yesterday, today).then(
            (chartData) => {
              res.json(chartData);
            }
          );
        } else res.status(404).end();
      }
    }
  );
});
chartDataRouter.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "data", "devices-data.json"),
    "utf-8",
    (erorr, data) => {
      if (erorr) console.error(erorr);
      else {
        const devicesData = JSON.parse(data) as DeviceData[];
        const deviceData = devicesData.find(
          (device) => device.deviceId === parseInt(req.query.deviceId as string)
        );
        if (deviceData) {
          extractChartData(
            deviceData.deviceData,
            new DateObject({
              calendar: persian,
              format: "YYYY/MM/DD HH:mm:ss",
              date: req.query.fromDateTime as string,
            }),
            new DateObject({
              calendar: persian,
              format: "YYYY/MM/DD HH:mm:ss",
              date: req.query.toDateTime as string,
            }),
            req.query.avrageMode as AvrageMode
          ).then((chartData) => {
            res.json(chartData);
          });
        } else res.status(404).end();
      }
    }
  );
});

export default chartDataRouter;
