export function deleteNum(str) {
  var reg = new RegExp('"', "g");
  return str.replace(reg, "");
}
