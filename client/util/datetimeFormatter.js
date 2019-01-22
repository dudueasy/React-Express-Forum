import dateFormat from 'dateformat'

export default (time) => {
  return dateFormat(time, "yy-mm-dd, h:MM TT");
}
