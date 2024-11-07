"use strict";

const countForm = document.querySelector("#form1");

countForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const number1 = Number(countForm.elements["firstNumber"].value);
  const number2 = Number(countForm.elements["secondNumber"].value);
  const sum = number1 + number2;
    
  document.getElementById("sum").innerHTML = sum;

});
