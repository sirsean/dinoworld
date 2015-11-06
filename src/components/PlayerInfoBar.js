var Actions = require("../actions/Actions.js");
var DinoDB = require("../db/DinoDB.js");
var PlayerStore = require("../stores/PlayerStore.js");
var Number = require("./Number.js");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            money: PlayerStore.state.money(),
            revenue: PlayerStore.state.revenue(),
            dinos: PlayerStore.state.dinos()
        };
    },
    componentDidMount: function() {
        PlayerStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        PlayerStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        if (this.isMounted()) {
            this.setState(this.getInitialState());
        }
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-sm-8 col-xs-2"></div>
                <div className="col-sm-2 col-xs-6 end-xs">
                    Current: <Number num={this.state.money} />
                </div>
                <div className="col-sm-2 col-xs-4 end-xs">
                    +<Number num={this.state.revenue} />/hour
                </div>
            </div>
        );
    }
});
