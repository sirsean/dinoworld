var Store = require("./Store.js");
var Actions = require("../actions/Actions.js");
var DinoDB = require("../db/DinoDB.js");
var Dino = require("../model/Dino.js");
var Util = require("../util/Util.js");

var dinos = [];
var money = 1000;
var lastCheckTimestamp = null;
var checkedDinos = [];

// load what we've stored, when we start up
read();

function write() {
    var blob = {
        money: money,
        lastCheckTimestamp: lastCheckTimestamp,
        dinos: dinos,
        checkedDinos: checkedDinos.map(function(dino) {
            return dino.id;
        })
    };
    localStorage["PlayerStore"] = JSON.stringify(blob);
}

function read() {
    if (localStorage["PlayerStore"]) {
        var stored = JSON.parse(localStorage["PlayerStore"]);
        money = stored["money"];
        lastCheckTimestamp = stored["lastCheckTimestamp"];
        dinos = stored["dinos"].map(function(dino) {
            return Dino.reload(dino);
        });
        checkedDinos = stored["checkedDinos"].map(function(id) {
            var found = dinos.filter(function(d) {
                return d.id == id;
            });
            if (found.length > 0) {
                return found[0];
            }
        }).filter(function(d) { return d != null; });
    }
}

setInterval(function() {
    Actions.revenueTick();
}, 1000);

function calculateCurrentRevenue() {
    return dinos.reduce(function(sum, dino) {
        return sum + dino.revenue();
    }, 0);
}

function calculateBattlePrice(dinos) {
    return Util.averageRevenue(dinos) / 3;
}

module.exports = new Store({
    state: {
        dinos: function() {
            dinos.sort(function(a, b) {
                return (b.attack() + b.totalHealth()) - (a.attack() + a.totalHealth());
            });
            return dinos;
        },
        money: function() {
            return money;
        },
        revenue: function() {
            return calculateCurrentRevenue();
        },
        checkedDinos: function() {
            return checkedDinos;
        },
        battlePrice: function() {
            return calculateBattlePrice(checkedDinos);
        }
    },
    handlers: {
        "PURCHASE_DINO": function(action) {
            var info = DinoDB.dinos[action.name];
            dinos.push(new Dino(action.name, 1));
            money -= info.cost;
            write();
        },
        "REVENUE_TICK": function() {
            var currentTimestamp = (new Date()).getTime();
            if (lastCheckTimestamp) {
                var ms = currentTimestamp - lastCheckTimestamp;
                var revenuePerHour = calculateCurrentRevenue();
                var revenuePerMs = revenuePerHour / 3600000.0;
                money += ms * revenuePerMs;
            }
            lastCheckTimestamp = currentTimestamp;
            write();
        },
        "FEED": function(action) {
            money -= action.dino.feedPrice();
            action.dino.feed();
            write();
        },
        "TOGGLE_CHECKED_DINO": function(action) {
            var index = checkedDinos.indexOf(action.dino);
            if (index != -1) {
                action.dino.checked = false;
                checkedDinos.splice(index, 1);
            } else {
                action.dino.checked = true;
                checkedDinos.push(action.dino);
            }
            write();
        },
        "CLEAR_CHECKED_DINOS": function() {
            var dino;
            while (dino = checkedDinos.shift()) {
                dino.checked = false;
            }
            write();
        },
        "START_BATTLE": function(action) {
            money -= calculateBattlePrice(action.dinos);
            write();
        },
        "COLLECT_WINNINGS": function(action) {
            if (Math.random() < 0.3) {
                checkedDinos.forEach(function(dino) {
                    dino.feed();
                });
            }
            money += action.winnings;
            write();
        }
    }
});
