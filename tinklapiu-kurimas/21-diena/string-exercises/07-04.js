// Write a JavaScript function to remove specified number of characters from a string.

function truncate_string(str, num) {
  return str.slice(0, num);
}

// Test Data :
console.log(truncate_string("Robin Singh", 4));
// "Robi"
