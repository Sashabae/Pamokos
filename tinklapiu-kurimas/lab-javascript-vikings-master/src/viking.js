// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }
  attack() {
    return this.strength;
  }
  receiveDamage(damage) {
    this.health -= damage;
  }
}
// TESTING
const soldier = new Soldier(100, 25);

console.log("Soldier attack strength:", soldier.attack());
console.log("Soldier health before damage:", soldier.health);
soldier.receiveDamage(20);
console.log("Soldier health after 20 damage:", soldier.health);

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }
  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`;
    } else {
      return `${this.name} has died in act of combat`;
    }
  }
  battleCry() {
    return "Odin Owns You All!";
  }
}
// TESTING
const viking = new Viking("Sasha", 150, 50);

console.log("Viking name:", viking.name);
console.log("Viking health:", viking.health);
console.log(viking.receiveDamage(30));
console.log(viking.receiveDamage(150));
console.log(viking.battleCry());

// Saxon
class Saxon extends Soldier {
  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `A Saxon has received ${damage} points of damage`;
    } else {
      return `A Saxon has died in combat`;
    }
  }
}
// TESTING
const saxon = new Saxon(50, 15);
console.log("Saxon health:", saxon.health);
console.log(saxon.receiveDamage(10));
console.log(saxon.receiveDamage(50));

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }

  addViking(Viking) {
    this.vikingArmy.push(Viking);
  }

  addSaxon(Saxon) {
    this.saxonArmy.push(Saxon);
  }

  vikingAttack() {
    const randomViking =
      this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    const randomSaxon =
      this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];

    const result = randomSaxon.receiveDamage(randomViking.strength);

    if (randomSaxon.health <= 0) {
      this.saxonArmy = this.saxonArmy.filter((saxon) => saxon.health > 0);
    }
    return result;
  }

  saxonAttack() {
    const randomViking =
      this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    const randomSaxon =
      this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];

    const result = randomViking.receiveDamage(randomSaxon.strength);

    if (randomViking.health <= 0) {
      this.vikingArmy = this.vikingArmy.filter((viking) => viking.health > 0);
    }
    return result;
  }

  showStatus() {
    if (this.saxonArmy.length === 0) {
      return "Vikings have won the battle!";
    } else if (this.vikingArmy.length === 0) {
      return "Saxons have won the battle!";
    } else {
      return `Vikings left: ${this.vikingArmy.length} | Saxons left: ${this.saxonArmy.length}`;
    }
  }
}
//TESTING
const war = new War();

// Create Vikings
const viking1 = new Viking("Dog", 100, 35);
const viking2 = new Viking("Cat", 120, 40);

// Create Saxons
const saxon1 = new Saxon(80, 25);
const saxon2 = new Saxon(60, 35);

// Add them to the war
war.addViking(viking1);
war.addViking(viking2);
war.addSaxon(saxon1);
war.addSaxon(saxon2);

// Fight
console.log(war.vikingAttack());
console.log(war.showStatus());

console.log(war.saxonAttack());
console.log(war.showStatus());

console.log(war.vikingAttack());
console.log(war.saxonAttack());
console.log(war.vikingAttack());
console.log(war.vikingAttack());
console.log(war.vikingAttack());
console.log(war.showStatus());
