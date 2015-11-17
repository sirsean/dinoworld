var Store = require("./Store.js");
var Actions = require("../actions/Actions.js");

function Message(text) {
    this.id = Math.random();
    this.text = text;
}

var messages = {};

function addMessage(text) {
    var message = new Message(text);
    messages[message.id] = message;

    setTimeout(function() {
        Actions.removeMessage(message.id);
    }, 1200);
}

module.exports = new Store({
    state: {
        messages: function() {
            var list = [];
            for (var key in messages) {
                if (messages.hasOwnProperty(key)) {
                    list.push(messages[key]);
                }
            }
            return list;
        }
    },
    handlers: {
        "REMOVE_MESSAGE": function(action) {
            delete messages[action.messageId];
        },
        "COLLECT_WINNINGS": function(action) {
            addMessage("You won " + Math.round(action.winnings) + "!");
        },
        "PURCHASE_DINO": function(action) {
            addMessage("You bought a new dino: " + action.name);
        },
        "LEVELED_UP": function(action) {
            addMessage(action.dino.name + " leveled up to " + action.dino.level);
        },
        "WIN_FEED": function(action) {
            addMessage(action.dino.name + " won a feeding!");
        }
    }
});
