import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import generateDevicesData from "./utils/generate-devices-data";
import { DeviceInfo } from "./types/device-info";
import { MeasuresData } from "./types/measures-data";
import { DeviceData } from "./types/device-data";
import devicesRouter from "./routes/device-router";
import chartDataRouter from "./routes/chart-data-router";

const app = express();
const port = process.env.PORT || "3000";

generateDevicesData().then((data) => {
  const devices_info: DeviceInfo[] = data.map((device) => ({
    deviceId: device.deviceId,
    deviceName: device.deviceName,
    deviceZone: device.deviceZone,
  }));
  const devices_data: DeviceData[] = data.map((device) => ({
    deviceId: device.deviceId,
    deviceData: device.deviceData,
  }));

  fs.writeFile(
    path.join(__dirname, "data", "devices-info.json"),
    JSON.stringify(devices_info, null, 2),
    (error) => {
      if (error) console.error(error);
    }
  );
  fs.writeFile(
    path.join(__dirname, "data", "devices-data.json"),
    JSON.stringify(devices_data, null, 2),
    (error) => {
      if (error) console.error(error);
    }
  );
});

app.use(cors());
app.use(express.json());

app.use("/device", devicesRouter);
app.use("/chart-data", chartDataRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("express js server + typescript");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
