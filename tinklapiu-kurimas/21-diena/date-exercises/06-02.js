// Write a JavaScript function to get the current date.

function curday(separator) {
  const d = new Date();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const day = d.getDate();
  return `${month}${separator}${day}${separator}${year}`;
}

// Note : Pass a separator as an argument.
// Test Data :
console.log(curday("/"));
console.log(curday("-"));
// Output :
// "11/13/2014"
// "11-13-2014"
