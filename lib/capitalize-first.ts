export function capitalizeFirstLetter(str: string | undefined | null) {
  if (str === undefined || str === null) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
