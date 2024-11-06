"use strict"

function celsiusToFahrenheit(temp) {
    return ((temp * 9.0 / 5.0) + 32.0);
}

const temp = Number(prompt("Temp in celsius:"));
console.log(celsiusToFahrenheit(temp));