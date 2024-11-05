"use strict";

const pazymis1 = Number(prompt("Pirmas pazymis:"));
const pazymis2 = Number(prompt("Antras pazymis:"));
const pazymis3 = Number(prompt("Trecias pazymis:"));
const pazymis4 = Number(prompt("Ketvirtas pazymis:"));
const pazymis5 = Number(prompt("Penktas pazymis:"));

const vidurkis = (pazymis1 + pazymis2 + pazymis3 + pazymis4 + pazymis5) / 5;

if (vidurkis > 9) {
  console.log("Petriukas gaus tris saldainius");
} else if (vidurkis >= 7 && vidurkis <=9) {
  console.log("Petriukas gaus du saldainius");
} else {
  console.log("Petriukas gaus viena saldaini");
}
