// Write a JavaScript function to check whether a string is blank or not.

function is_Blank(str) {
  return str.trim().length === 0;
}

// Test Data :
console.log(is_Blank(""));
console.log(is_Blank("abc"));
// true
// false
