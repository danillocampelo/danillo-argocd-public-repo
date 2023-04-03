export const removeEmptyValues = (object: any) => {
  for (const key of Object.keys(object)) {
    const value = object[key]
    if (value === null || value === undefined || value === '') {
      delete object[key]
    }
  }
}
