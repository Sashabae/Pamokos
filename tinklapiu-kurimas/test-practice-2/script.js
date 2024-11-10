"use strict"

// 1
function averageEvenNumbers() {
    let sum = 0;
    let count = 0;

    for (let i = 1; i <= 50; i++) {
        if (i % 2 === 0) { 
            sum += i;       
            count++;       
        }
    }

    return sum / count;     
}

console.log(averageEvenNumbers());

// 2

function randomWords(count) {
    const words = ["JavaScript", "kodas", "kompiuteris", "programa", "duomenys"];
    const result = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        result.push(words[randomIndex]);
    }

    return result.join("\n");
}

console.log(randomWords(3));


// 3

function guessTheNumber() {
    const targetNumber = Math.floor(Math.random() * 10) + 1;
    let isPlaying = true;

    while (isPlaying) {
        const playResponse = prompt("Ar norite speti skaičiu?").toLowerCase();  

        if (playResponse === "ne") {
            console.log("Žaidimas baigtas.");
            isPlaying = false;
            break;
        } else if (playResponse === "taip") {
            const guess = parseInt(prompt("Įveskite skaičių tarp 1 ir 10: "), 10);

            if (guess === targetNumber) {
                console.log("Atspejote teisingai!");
                isPlaying = false; 
            }
        }
    }
}

guessTheNumber();


// 4

const names = ["Jonas", "Domas", "Tomas", "Rasa", "Gintarė"];

// 1. Pridėti „Karolis“ į pradžią
function addKarolis(arr) {
    arr.unshift("Karolis");
    return arr;
}
console.log(addKarolis(names));

// 2. Pašalinti „Domas“
function removeDomas(arr) {
    const index = arr.indexOf("Domas");
    if (index !== -1) {
        arr.splice(index, 1);
    }
    return arr;
}
console.log(removeDomas(names));

// 3. Pridėti „& Co“ kiekvienam vardui
function addCo(arr) {
    return arr.map(name => name + "& Co");
}
console.log(addCo(names));

// 4. Išrikiuoti vardus abėcėlės tvarka
function sortNames(arr) {
    return arr.sort();
}
console.log(sortNames(names));
