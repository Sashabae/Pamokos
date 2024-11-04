"use strict";

const zuvuSkaicius = Number(prompt("Kiek zuvu gyvena akvariume?"));
const idedamaZuvu = Number(
  prompt("Kiek zuvu i akvariuma idedama kiekviena diena?")
);
const praejoDienu = Number(prompt("Kiek dienu praejo?"));

const kiekIsvisIdejo = idedamaZuvu * praejoDienu;

const rezultatas = zuvuSkaicius + kiekIsvisIdejo;

console.log("Po", praejoDienu, "dienu akvariume gyvens", rezultatas, "zuvu");
