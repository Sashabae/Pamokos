// Write a JavaScript function to add specified minutes to a Date object.

function add_minutes(date, minutes) {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

// Test Data :
console.log(add_minutes(new Date(2014, 10, 2), 30).toString());
// Output :
// "Sun Nov 02 2014 00:30:00 GMT+0530 (India Standard Time)"
