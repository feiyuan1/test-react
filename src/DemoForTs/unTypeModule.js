export const unTypeModule = (formData) => {
  return Object.keys(formData).reduce((result, key) => {
    return result + key + ': ', formData[key]
  }, '')
}
