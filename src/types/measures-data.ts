export type MeasuresData = {
  datetime: Date; //date
  temperature: number; // -30C to +99C
  humidity: number; // 0% to 100%
};

export type MeasuresDataInRage = {
  datetimeRange: [Date, Date]; //[from-date, to-date]
  temperature: number; // -30C to +99C
  humidity: number; // 0% to 100%
};
