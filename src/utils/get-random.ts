export default function getRandomInRange(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}
