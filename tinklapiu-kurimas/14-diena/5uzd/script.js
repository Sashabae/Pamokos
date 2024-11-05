"use strict";

let zingsniai = Number(prompt("Iveskite zingsniu kieki iki mokyklos:"));
let suplojimai = 0;
let spragtelejimai = 0;

for (let i = 1; i <= zingsniai; i++) {
  if (i % 10 === 0) {
    suplojimai++;
  } else if (i % 5 === 0) {
    spragtelejimai++;
  }
}
console.log(`Suplojimu bus: ${suplojimai}`);
console.log(`Spragtelejimu bus: ${spragtelejimai}`);
