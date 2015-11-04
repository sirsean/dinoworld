var Store = require("./Store.js");
var Util = require("../util/Util.js");
var Actions = require("../actions/Actions.js");

var page;

readURL();

function readURL() {
    page = Util.getURLParameter("p");
}

function setURL(replace) {
    var segments = [];
    if (page) {
        segments.push("p=" + page);
    }
    var url = "/?" + segments.join("&");
    if (replace) {
        window.history.replaceState({}, null, url);
    } else {
        window.history.pushState({}, null, url);
    }

    // send analytics event
    //ga("send", "pageview", url);
}

module.exports = new Store({
    state: {
        page: function() {
            return page;
        }
    },
    handlers: {
        "URL_CHANGE": function() {
            readURL();
        },
        "SET_PAGE": function(action) {
            page = action.page;
            setURL();
        }
    }
});
