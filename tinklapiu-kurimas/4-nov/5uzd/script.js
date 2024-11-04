"use strict";

const sienosIlgis = parseInt(prompt("Sienos ilgis:"));
const sienosAukstis = parseInt(prompt("Sienos aukstis:"));
const plytosKaina = Number(prompt("Plytos kaina:"));

const PlytuIlgisMetrias = 20 / 100;
const PlytuAukstisMetrias = 10 / 100;

const SienosPlotas = sienosAukstis * sienosIlgis;
const PlytosPlotas = PlytuAukstisMetrias * PlytuIlgisMetrias;

const PlytuKiekis = SienosPlotas / PlytosPlotas;

const PlytosKainuos = (plytosKaina * PlytuKiekis).toFixed(2);

console.log("Plytu kiekis:", PlytuKiekis);
console.log("Plytos kainuos:", PlytosKainuos, "Lt");
