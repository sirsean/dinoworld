var RouteStore = require("../stores/RouteStore.js");
var Actions = require("../actions/Actions.js");
var PlayerInfoBar = require("./PlayerInfoBar.js");
var DinoShop = require("./DinoShop.js");
var PlayerInventory = require("./PlayerInventory.js");
var Battle = require("./Battle.js");
var Messages = require("./Messages.js");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            page: RouteStore.state.page()
        };
    },
    componentDidMount: function() {
        RouteStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        RouteStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        if (this.isMounted()) {
            this.setState(this.getInitialState());
        }
    },
    onInventoryClick: function() {
        Actions.setPage("inventory");
    },
    onShopClick: function() {
        Actions.setPage("shop");
    },
    render: function() {
        var content;
        if (this.state.page == "shop") {
            content = (
                <DinoShop />
            );
        } else if (this.state.page == "battle") {
            content = (
                <Battle />
            );
        } else {
            content = (
                <PlayerInventory />
            );
        }
        return (
            <div>
                <Messages />
                {content}
            </div>
        );
    }
});
