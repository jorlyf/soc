export const isEmpty = (value) => {
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}
export const isMyId = (id1, id2) => {
  return +id1 === +id2;
}
export const trimString = (string) => {
  return string.trim().replace(/  +/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n');
}