export function isEmpty(value) {
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}
export function isMyId(id1, id2) {
  return +id1 === +id2;
}