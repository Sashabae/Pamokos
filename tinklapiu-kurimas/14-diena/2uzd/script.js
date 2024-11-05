"use strict";

const kiekSveriaGramais = Number(prompt("Kiek sveria varle?"));
const kiekStebima = Number(prompt("Kiek varliu norima stebeti?"));

const kiekSveriaKilogramaisStebimosVarles =
  (kiekSveriaGramais / 1000) * kiekStebima;

if (kiekSveriaKilogramaisStebimosVarles > 5) {
  console.log("Varliu stebejimui pakanka");
} else {
  console.log("Varliu stebejimui per mazai");
}
