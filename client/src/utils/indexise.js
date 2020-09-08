export default function indexise(array, index) {
  return array.reduce((obj, curr) => {
    obj[curr[index]] = curr
    return obj
  }, {})
}
