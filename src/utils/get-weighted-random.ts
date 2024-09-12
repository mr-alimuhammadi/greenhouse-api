import getRandomInRange from "./get-random";

export default function getWeightedRandom(
  min: number,
  max: number,
  preferredMin: number,
  preferredMax: number,
  biasPercentage: number = 70
): number {
  const isInPreferredRange = Math.random() < biasPercentage / 100;

  if (isInPreferredRange) {
    // Generate a value within the preferred range
    return getRandomInRange(preferredMin, preferredMax);
  } else {
    // Generate a value in the full range (outside the preferred range)
    return getRandomInRange(min, max);
  }
}
