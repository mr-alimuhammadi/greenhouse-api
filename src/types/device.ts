import { MeasuresData } from "./measures-data";

export type Device = {
  deviceId: number;
  deviceName: string;
  deviceZone: string;
  deviceData: MeasuresData[];
};
