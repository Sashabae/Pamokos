"use strict";

const tunelioIlgis = 264;
const automobilioGreitis = Number(prompt("Koks automobilio greitis?"));

const tunelioIlgisKilometrias = tunelioIlgis / 1000;

const rezultatas = (
  (tunelioIlgisKilometrias / automobilioGreitis) *
  3600
).toFixed(2);

console.log("Automobilis tuneli pravaziuos per", rezultatas, "s");
