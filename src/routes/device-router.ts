import express from "express";
import fs from "fs";
import path from "path";
import { DeviceInfo } from "../types/device-info";

const deviceRouter = express.Router();

deviceRouter.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "data", "devices-info.json"),
    "utf-8",
    (erorr, data) => {
      if (erorr) console.error(erorr);
      else res.json(JSON.parse(data));
    }
  );
});
deviceRouter.get("/:id", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "data", "devices-info.json"),
    "utf-8",
    (erorr, data) => {
      if (erorr) console.error(erorr);
      else {
        const devicesInfo = JSON.parse(data) as DeviceInfo[];
        const deviceInfo = devicesInfo.find(
          (device) => device.deviceId === parseInt(req.params.id)
        );
        if (deviceInfo) res.json(deviceInfo);
        else res.status(404).end();
      }
    }
  );
});

export default deviceRouter;
