// Write a JavaScript function to parameterize a string.

function string_parameterize(str) {
  return str.trim().toLowerCase().split(/\s+/).join("-");
}

// Test Data :
console.log(string_parameterize("Robin Singh from USA."));
// "robin-singh-from-usa"
