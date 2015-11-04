var DinoDB = require("../db/DinoDB.js");

function Dino(name, level) {
    this.id = Math.random();
    this.name = name;
    this.level = level;
    this.currentHealth = 0;
    this.feedings = 0;
    this.checked = false;
}

Dino.reload = function(blob) {
    var dino = new Dino(blob.name, blob.level);
    dino.id = blob.id;
    dino.currentHealth = blob.currentHealth;
    dino.feedings = blob.feedings;
    dino.checked = blob.checked;
    return dino;
};

Dino.prototype.type = function() {
    return DinoDB.dinos[this.name].type;
};

Dino.prototype.heal = function() {
    var base = DinoDB.values(this.name, this.level);
    this.currentHealth = base.health;
};

Dino.prototype.totalHealth = function() {
    return this.info().health;
};

Dino.prototype.attack = function(enemy) {
    var base = this.info();
    var type = (enemy != null) ? enemy.type() : null;
    return base.attack * DinoDB.attackMultiplier(this.type(), type);
};

Dino.prototype.calculateAttack = function(enemy, numAttacks) {
    var modifier = (numAttacks < 8) ? 1.0 : 0.5;
    return this.attack(enemy) * (numAttacks + (numAttacks * (0.2 * (numAttacks - modifier))));
};

Dino.prototype.takeDamage = function(damage) {
    this.currentHealth = Math.max(0, this.currentHealth - damage);
};

Dino.prototype.isDead = function() {
    return (this.currentHealth <= 0);
};

Dino.prototype.revenue = function() {
    return this.info().revenue;
};

Dino.prototype.info = function() {
    return DinoDB.values(this.name, this.level);
};

Dino.prototype.feedPrice = function() {
    var cost = this.info().cost;
    var multiplier = 0.33;
    if (this.level % 10 == 0) {
        multiplier += Math.floor(this.level / 10);
    }
    return cost * multiplier * this.level;
};

Dino.prototype.feed = function() {
    this.feedings++;
    if (this.feedings >= 5) {
        this.level++;
        this.feedings = 0;
    }
};

module.exports = Dino;
