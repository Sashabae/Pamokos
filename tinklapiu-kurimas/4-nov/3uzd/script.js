"use strict";

const monetos5ct = Number(prompt("Kiek yra monetu po 5 ct?"));
const monetos20ct = Number(prompt("Kiek yra monetu po 20 ct?"));
const monetos2lt = Number(prompt("Kiek yra monetu po 2 Lt?"));

const ct5litais = (monetos5ct * 5) / 100;
const ct20litais = (monetos20ct * 20) / 100;
const litais2 = monetos2lt * 2;

const rezultatas = litais2 + ct20litais + ct5litais;

console.log("Taupykleje yra", rezultatas, "Lt.");
