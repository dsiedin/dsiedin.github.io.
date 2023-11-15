export default function formateDate(stockPrices) {
  let date;
  let day;
  let month;
  let year;
  stockPrices.forEach((element) => {
    date = new Date(element.Date);
    day = ("0" + date.getDate()).slice(-2);
    month = ("0" + (date.getMonth() + 1)).slice(-2);
    year = date.getFullYear();
    element.Date = `${year}-${month}-${day}`;
  });
}
