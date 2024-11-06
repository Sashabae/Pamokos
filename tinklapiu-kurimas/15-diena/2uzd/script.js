"use strict"

function compareBMI(a, b, c, d) {

    const bmi1 = a / b ;
    const bmi2 = c / d;
    return bmi1 > bmi2;

}

console.log(compareBMI(70, 1.85, 68, 1.87));