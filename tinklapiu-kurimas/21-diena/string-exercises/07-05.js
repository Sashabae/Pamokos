//  Write a JavaScript function to convert a string in abbreviated form.

function abbrev_name(str) {
  const split_names = str.trim().split(" ");
  if (split_names.length > 1) {
    return split_names[0] + " " + split_names[1].charAt(0) + ".";
  }
  return split_names[0];
}

// Test Data :
console.log(abbrev_name("Robin Singh"));
// "Robin S."
