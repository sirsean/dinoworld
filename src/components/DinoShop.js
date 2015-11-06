var Actions = require("../actions/Actions.js");
var DinoDB = require("../db/DinoDB.js");
var PlayerInfoBar = require("./PlayerInfoBar.js");
var PlayerStore = require("../stores/PlayerStore.js");
var Number = require("./Number.js");
var Util = require("../util/Util.js");
var Button = require("./Button.js");

var DinoRow = React.createClass({
    onPurchaseClick: function() {
        Actions.purchaseDino(this.props.dino.name);
        Actions.setPage("inventory");
    },
    render: function() {
        var dino = this.props.dino;
        var className = "dino-grid-cell col-sm-3 col-xs-12 middle-xs " + Util.dinoTypeColors[dino.type];
        if (!this.props.enabled) {
            className += " disabled";
        }
        return (
            <div className={className}>
                <div className="row middle-xs">
                    <div className="col-xs-12 center-xs">
                        <strong>{dino.name}</strong>
                    </div>
                </div>
                <div className="row middle-xs center-xs">
                    <div className="col-xs-12">
                        <img className="grid-img" src="/img/dino.png" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-8">
                        <div className="row">
                            <div className="col-xs-6">Attack</div>
                            <div className="col-xs-6"><Number num={dino.attack} /></div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">Health</div>
                            <div className="col-xs-6"><Number num={dino.health} /></div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">Revenue</div>
                            <div className="col-xs-6"><Number num={dino.revenue} /></div>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="row center-xs">
                            <div className="col-xs-12">
                                <Button disabled={!this.props.enabled || this.props.money < dino.cost} onClick={this.onPurchaseClick}>
                                    <div>Buy</div>
                                    <div>
                                        <Number num={dino.cost} />
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
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
                <div className="row middle-xs">
                    <div className="col-xs-3">
                        <Button css="bigger" onClick={this.onHomeClick}>Home</Button>
                    </div>
                    <div className="col-xs-6 center-xs">
                        <h1>Dino Shop</h1>
                    </div>
                </div>
                <div className="row">
                    {dinos.map(function(dino, i) {
                        var enabled = (i < this.state.maxIndex + 10);
                        return <DinoRow key={dino.name} dino={dino} money={this.state.money} enabled={enabled} />
                    }.bind(this))}
                </div>
            </div>
        );
    }
});
