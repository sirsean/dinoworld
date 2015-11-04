var Actions = require("../actions/Actions.js");

function Aggressive() {
}

Aggressive.prototype.generateMoves = function(numMoves) {
    var moves = [];
    for (var i=0; i < numMoves; i++) {
        moves.push(function() {
            Actions.battleAttack();
        });
    }
    return moves;
};

function Random() {
}

Random.prototype.generateMoves = function(numMoves) {
    var potentials = [Actions.battleAttack, Actions.battleDefend, Actions.battleSave];
    var moves = [];
    var saves = 0;
    for (var i=0; i < numMoves; i++) {
        var index = Math.floor(Math.random() * potentials.length);
        var action = potentials[index];
        if (action == Actions.battleSave) {
            saves++;
        }
        if (saves >= 4) {
            action = Actions.battleAttack;
        }
        moves.push(action);
    }
    return moves;
};

function Saver() {
}

Saver.prototype.generateMoves = function(numMoves) {
    var moves = [];
    var saves = 0;
    for (var i=0; i < numMoves; i++) {
        if (saves < 4) {
            moves.push(Actions.battleSave);
            saves++;
        } else {
            moves.push(Actions.battleAttack);
        }
    }
    return moves;
};

module.exports = {
    random: function() {
        var ais = [Aggressive, Random];
        var index = Math.floor(Math.random() * ais.length);
        return new ais[index]();
    }
};
