var Actions = require("../actions/Actions.js");
var DinoDB = require("../db/DinoDB.js");
var PlayerInfoBar = require("./PlayerInfoBar.js");
var PlayerStore = require("../stores/PlayerStore.js");
var Number = require("./Number.js");
var Util = require("../util/Util.js");

var DinoRow = React.createClass({
    onPurchaseClick: function() {
        Actions.purchaseDino(this.props.dino.name);
        Actions.setPage("inventory");
    },
    render: function() {
        var dino = this.props.dino;
        var className = "grid-row row middle-xs " + Util.dinoTypeColors[dino.type];
        if (!this.props.enabled) {
            className += " disabled";
        }
        return (
            <div className={className}>
                <div className="col-sm-6 col-xs-6">{dino.name}</div>
                <div className="col-sm-1 col-xs-3 end-xs"><Number num={dino.health} /></div>
                <div className="col-sm-1 col-xs-3 end-xs"><Number num={dino.attack} /></div>
                <div className="col-sm-1 col-xs-3 end-xs"><Number num={dino.revenue} /></div>
                <div className="col-sm-1 col-xs-3 end-xs"><Number num={dino.cost} /></div>
                <div className="col-sm-2 col-xs-6 end-xs">
                    <button disabled={!this.props.enabled || this.props.money < dino.cost} onClick={this.onPurchaseClick}>Buy</button>
                </div>
            </div>
        );
    }
});

var dinos = DinoDB.dinosByCost();

module.exports = React.createClass({
    getInitialState: function() {
        var maxIndex = 0;
        PlayerStore.state.dinos().forEach(function(dino) {
            maxIndex = Math.max(maxIndex, Util.dinoIndex(dinos, dino.name));
        });
        return {
            money: PlayerStore.state.money(),
            maxIndex: maxIndex
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
    onHomeClick: function() {
        Actions.setPage(null);
    },
    render: function() {
        return (
            <div>
                <PlayerInfoBar />
                <h1>Dino Shop</h1>
                <div>
                    <button onClick={this.onHomeClick}>Home</button>
                </div>
                <div className="row middle-xs">
                    <div className="col-sm-6 col-xs-6">Name</div>
                    <div className="col-sm-1 col-xs-3 end-xs">Health</div>
                    <div className="col-sm-1 col-xs-3 end-xs">Attack</div>
                    <div className="col-sm-1 col-xs-3 end-xs">Revenue</div>
                    <div className="col-sm-1 col-xs-3 end-xs">Cost</div>
                    <div className="col-sm-2 col-xs-6 end-xs"></div>
                </div>
                {dinos.map(function(dino, i) {
                    var enabled = (i < this.state.maxIndex + 10);
                    return <DinoRow key={dino.name} dino={dino} money={this.state.money} enabled={enabled} />
                }.bind(this))}
            </div>
        );
    }
});
