"use strict";

let kiekSnaigiuNukritoPerPirmaSecunde = Number(
  prompt("Kiek snaigiu nukrito per pirmaja sekunde?")
);
let kiekSekundziuSnigo = Number(prompt("Kiek sekundziu snigo?"));
let kiekSnaigiuIsvis = 0;

for (let i = 1; i <= kiekSekundziuSnigo; i++) {
  kiekSnaigiuIsvis = kiekSnaigiuIsvis + kiekSnaigiuNukritoPerPirmaSecunde;
  kiekSnaigiuNukritoPerPirmaSecunde *= 2;
}

console.log(kiekSnaigiuIsvis);
