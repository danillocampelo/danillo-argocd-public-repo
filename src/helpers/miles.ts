export function calculateMiles(price: number) {
  return Math.ceil(price * parseFloat(process.env['MILES_VALUE']))
}
