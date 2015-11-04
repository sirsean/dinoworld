var Dispatcher = require("../dispatcher/Dispatcher.js");

module.exports = {
    setPage: function(page) {
        Dispatcher.dispatch({
            type: "SET_PAGE",
            page: page
        });
    },
    urlChange: function() {
        Dispatcher.dispatch({
            type: "URL_CHANGE"
        });
    },
    purchaseDino: function(name) {
        Dispatcher.dispatch({
            type: "PURCHASE_DINO",
            name: name
        });
    },
    revenueTick: function() {
        Dispatcher.dispatch({
            type: "REVENUE_TICK"
        });
    },
    feed: function(dino) {
        Dispatcher.dispatch({
            type: "FEED",
            dino: dino
        });
    },
    toggleCheckedDino: function(dino) {
        Dispatcher.dispatch({
            type: "TOGGLE_CHECKED_DINO",
            dino: dino
        });
    },
    clearCheckedDinos: function() {
        Dispatcher.dispatch({
            type: "CLEAR_CHECKED_DINOS"
        });
    },
    startBattle: function(dinos) {
        Dispatcher.dispatch({
            type: "START_BATTLE",
            dinos: dinos
        });
    },
    battleSave: function() {
        Dispatcher.dispatch({
            type: "BATTLE_SAVE"
        });
    },
    battleDefend: function() {
        Dispatcher.dispatch({
            type: "BATTLE_DEFEND"
        });
    },
    battleAttack: function() {
        Dispatcher.dispatch({
            type: "BATTLE_ATTACK"
        });
    },
    battleSwitch: function(dino) {
        Dispatcher.dispatch({
            type: "BATTLE_SWITCH",
            dino: dino
        });
    },
    collectWinnings: function(winnings) {
        Dispatcher.dispatch({
            type: "COLLECT_WINNINGS",
            winnings: winnings
        });
    }
};
