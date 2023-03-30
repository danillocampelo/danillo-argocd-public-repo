export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  value = value < inMin ? outMin : value > inMax ? outMax : value
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
