"use strict";

const pirmadienis = Number(prompt("Kiek pamoku yra pirmadieni:"));
const antradienis = Number(prompt("Kiek pamoku yra antradieni:"));
const treciadienis = Number(prompt("Kiek pamoku yra treciadieni:"));
const ketvirtadienis = Number(prompt("Kiek pamoku yra ketvirtadieni:"));
const penktadienis = Number(prompt("Kiek pamoku yra penktadieni:"));

const rezultatas =
  pirmadienis + antradienis + treciadienis + ketvirtadienis + penktadienis;

const minutes = 45;
const pamokosminutemis = minutes * rezultatas;

console.log("Pamoku skaicius:", rezultatas);
console.log("Tai sudaro minuciu:", pamokosminutemis);
