var Actions = require("./actions/Actions.js");
window.onpopstate = function(e) {
    Actions.urlChange();
};

var Main = require("./components/Main.js");

React.render(
    <Main />,
    document.body
);
