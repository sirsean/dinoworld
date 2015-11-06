var Store = require("./Store.js");
var DinoDB = require("../db/DinoDB.js");
var Dino = require("../model/Dino.js");
var Actions = require("../actions/Actions.js");
var Util = require("../util/Util.js");
var RouteStore = require("./RouteStore.js");
var AI = require("../ai/AI.js");

var playerDinos = [];
var opponentDinos = [];
var turns = 1;
var isPlayerTurn = false;
var opponentAi = null;

var maxMoves = 1;
var saves = 0;
var defends = 0;
var attacks = 0;
var lastDefends = 0;
var playerSaves = 0;
var opponentSaves = 0;
var switches = 0;

var winner = null;
var winnings = 0;

var logs = [];

// don't be here if there are no dinos (first-load protection)
if ((RouteStore.state.page() == "battle") && (playerDinos.length != 3)) {
    Actions.setPage("home");
}

function currentPlayerDino() {
    if (playerDinos.length > 0) {
        return playerDinos[0];
    }
}

function currentOpponentDino() {
    if (playerDinos.length > 0) {
        return opponentDinos[0];
    }
}

function calculateMaxMoves() {
    maxMoves = turns;
    if (maxMoves >= 4) {
        maxMoves = 4;
    }
}

function currentMoves() {
    var bonus = 0;
    if (!isPlayerTurn && (turns == 1)) {
        bonus = 1;
    }
    var lastSaves = isPlayerTurn ? playerSaves : opponentSaves;
    return (maxMoves + bonus + lastSaves - movesTaken());
}

function movesTaken() {
    return saves + defends + attacks + switches;
}

function checkEndTurn() {
    if (currentMoves() <= 0) {
        endTurn();
    }
}

function getAttacker() {
    if (isPlayerTurn) {
        return currentPlayerDino();
    } else {
        return currentOpponentDino();
    }
}

function getDefender() {
    if (isPlayerTurn) {
        return currentOpponentDino();
    } else {
        return currentPlayerDino();
    }
}

function endTurn() {
    var attacker = getAttacker();
    var defender = getDefender();

    var numAttacks = Math.max(0, attacks - lastDefends);
    var totalDamage = attacker.calculateAttack(defender, numAttacks);

    defender.takeDamage(totalDamage);

    if (attacks > 0) {
        logs.unshift({
            player: isPlayerTurn,
            action: "ATTACK",
            attacker: attacker.name,
            defender: defender.name,
            attacks: attacks,
            defends: lastDefends,
            totalDamage: totalDamage
        });
    } else if (lastDefends > 0) {
        logs.unshift({
            player: !isPlayerTurn,
            action: "BLOCK",
            defender: defender.name,
            defends: lastDefends
        });
    }

    if (!isPlayerTurn) {
        turns++;
    }

    if (defender.isDead()) {
        logs.unshift({
            player: isPlayerTurn,
            action: "DINO_DIED",
            attacker: attacker.name,
            defender: defender.name
        });
        if (isPlayerTurn) {
            opponentDinos.push(opponentDinos.shift());
        } else {
            playerDinos.push(playerDinos.shift());
        }
    }

    if (isPlayerTurn) {
        playerSaves = saves;
    } else {
        opponentSaves = saves;
    }

    var over = checkWinner();
    if (over) {
        return;
    }

    isPlayerTurn = !isPlayerTurn;
    calculateMaxMoves();
    lastDefends = defends;
    saves = defends = attacks = switches = 0;

    if (!isPlayerTurn) {
        // run the opponent AI
        setTimeout(function() {
            opponentAi.generateMoves(currentMoves()).forEach(function(move) {
                move();
            });
        }, 400);
    }
}

function checkWinner() {
    var playerWins = opponentDinos.reduce(function(allDead, dino) {
        return allDead && dino.isDead();
    }, true);
    var opponentWins = playerDinos.reduce(function(allDead, dino) {
        return allDead && dino.isDead();
    }, true);

    if (playerWins) {
        winner = "player";
        winnings = calculateWinnings();
        return true;
    } else if (opponentWins) {
        winner = "opponent";
        winnings = 0;
        return true;
    } else {
        winner = null;
        winnings = 0;
        return false;
    }
}

function numAlive(dinos) {
    return dinos.reduce(function(numAlive, dino) {
        return numAlive + (dino.isDead() ? 0 : 1);
    }, 0);
}

function calculateWinnings() {
    return Util.averageRevenue(opponentDinos) * 0.85 * numAlive(playerDinos);
}

module.exports = new Store({
    state: {
        playerDinos: function() {
            return playerDinos;
        },
        opponentDinos: function() {
            return opponentDinos;
        },
        currentPlayerDino: function() {
            return currentPlayerDino();
        },
        currentOpponentDino: function() {
            return currentOpponentDino();
        },
        isPlayerTurn: function() {
            return isPlayerTurn;
        },
        maxMoves: function() {
            return maxMoves;
        },
        currentMoves: function() {
            return currentMoves();
        },
        movesTaken: function() {
            return movesTaken();
        },
        saves: function() {
            return saves;
        },
        defends: function() {
            return defends;
        },
        attacks: function() {
            return attacks;
        },
        switches: function() {
            return switches;
        },
        winner: function() {
            return winner;
        },
        winnings: function() {
            return winnings;
        },
        currentDamage: function() {
            return getAttacker().calculateAttack(getDefender(), attacks);
        },
        nextDamage: function() {
            return getAttacker().calculateAttack(getDefender(), attacks + 1);
        },
        logs: function() {
            return logs;
        }
    },
    handlers: {
        "START_BATTLE": function(action) {
            winner = null;
            winnings = 0;
            turns = 1;
            isPlayerTurn = true;
            saves = 0;
            defends = 0;
            attacks = 0;
            lastDefends = 0;
            playerSaves = 0;
            opponentSaves = 0;
            playerDinos = action.dinos;
            opponentDinos = [];
            logs = [];
            opponentAi = AI.random();

            var dinos = DinoDB.dinosByPower();
            playerDinos.forEach(function(dino) {
                var opponentLevel = Math.max(1, dino.level + Math.floor(Math.random() * 4) - 2);
                var index = Util.dinoIndex(dinos, dino.name);;
                index += Math.floor(Math.random() * 12 - 6);
                index = Math.max(0, index);
                index = Math.min(index, dinos.length - 1);
                var opponent = new Dino(dinos[index].name, opponentLevel);
                opponent.heal();
                opponentDinos.push(opponent);

                dino.heal();
            });
            calculateMaxMoves();
            Actions.setPage("battle");
        },
        "BATTLE_SAVE": function() {
            if (saves < 4) {
                saves++;
            }
            checkEndTurn();
        },
        "BATTLE_DEFEND": function() {
            defends++;
            checkEndTurn();
        },
        "BATTLE_ATTACK": function() {
            attacks++;
            checkEndTurn();
        },
        "BATTLE_SWITCH": function(action) {
            switches++;

            var dinos;
            if (isPlayerTurn) {
                dinos = playerDinos;
            } else {
                dinos = opponentDinos;
            }

            var index;
            for (index=0; index < dinos.length; index++) {
                if (dinos[index].id == action.dino.id) {
                    break;
                }
            }
            var spliced = dinos.splice(index, 1);
            dinos.unshift(spliced[0]);

            logs.unshift({
                player: isPlayerTurn,
                action: "SWITCH",
                to: spliced[0].name
            });

            checkEndTurn();
        }
    }
});
