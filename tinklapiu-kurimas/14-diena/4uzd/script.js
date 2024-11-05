"use strict";

let pradzia = Number(prompt("Iveskite intervalo pradzia"));
let pabaiga = Number(prompt("Iveskite intervalo pabaiga"));
let marskineliai = 0;

for (let i = pradzia; i <= pabaiga; i++) {
  if (i % 6 === 0) {
    marskineliai++;
  }
}
console.log("Reikalingu marskineliu skaicius:", marskineliai);
