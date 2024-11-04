"use strict";

const zuvys = Number(prompt("Kiek zuvu gyvena akvariume?"));
const idedazuvu = Number(
  prompt("Kiek zuvu i akvariuma idedama kiekviena diena?")
);
const dienas = Number(prompt("Kiek dienu praejo?"));

const idedadienuzuvys = idedazuvu * dienas;

const rezultatas = zuvys + idedadienuzuvys;

console.log("Po", dienas, "dienu akvariume gyvens", rezultatas, "zuvu");
