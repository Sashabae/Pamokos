// Write a JavaScript function to compare dates (i.e. greater than, less than or equal to).

function compare_dates(d1, d2) {
  let date1 = new Date(d1);
  let date2 = new Date(d2);

  if (date1 < date2) {
    return `date2 > date1`;
  } else if (date1 > date2) {
    return `date1 > date2`;
  } else {
    return `date1 = date2`;
  }
}

// Test Data :
console.log(
  compare_dates(new Date("11/14/2013 00:00"), new Date("11/14/2013 00:00"))
);
console.log(
  compare_dates(new Date("11/14/2013 00:01"), new Date("11/14/2013 00:00"))
);
console.log(
  compare_dates(new Date("11/14/2013 00:00"), new Date("11/14/2013 00:01"))
);
// Output :
// "Date1 = Date2"
// "Date1 > Date2"
// "Date2 > Date1"
