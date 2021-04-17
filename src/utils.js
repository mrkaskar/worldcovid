export function between(val, a, b) {
  return val >= a && val <= b;
}
export function format(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = `${day}/${month}/${year} (${hours}:${minutes} ${ampm})`;
  return strTime;
}
