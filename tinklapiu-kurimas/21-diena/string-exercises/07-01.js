//  Write a JavaScript function to check whether an `input` is a string or not.

function is_string(input) {
  return Object.prototype.toString.call(input) === "[object String]";
}

// Test Data :
console.log(is_string("w3resource"));
// true
console.log(is_string([1, 2, 4, 0]));
// false
