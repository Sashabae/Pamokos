"use strict";

const sokioAukstis = Number(prompt("is kokio aukscio soka parasiutininkas?"));
const parasutoAtskleidimolaikas = Number(
  prompt("Per kiek sekundziu issiskleidzia jo parasutas?")
);

const g = 9.8;
const kritimoLaikas = Math.sqrt(((2 * sokioAukstis) / g));

if (parasutoAtskleidimolaikas < kritimoLaikas) {
  console.log("parasiutas issiskleis");
} else {
  console.log("parasiutas neissiskleis");
}

