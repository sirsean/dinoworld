var Actions = require("../actions/Actions.js");
var PlayerStore = require("../stores/PlayerStore.js");
var PlayerInfoBar = require("./PlayerInfoBar.js");
var Number = require("./Number.js");
var Util = require("../util/Util.js");
var Button = require("./Button.js");

var DinoRow = React.createClass({
    onFeedClick: function() {
        Actions.feed(this.props.dino);
    },
    onCheckChanged: function() {
        Actions.toggleCheckedDino(this.props.dino);
    },
    render: function() {
        var dino = this.props.dino;
        var info = dino.info();
        var feedButtonDisabled = (this.props.money < dino.feedPrice());
        var className = "dino-grid-cell col-sm-3 col-xs-12 middle-xs " + Util.dinoTypeColors[dino.type()];
        return (
            <div className={className}>
                <div className="row middle-xs">
                    <div className="col-xs-2">
                        <input
                            type="checkbox"
                            checked={dino.checked}
                            onChange={this.onCheckChanged} />
                    </div>
                    <div className="col-xs-10 center-xs">
                        <strong>{dino.name}</strong>
                    </div>
                </div>
                <div className="row middle-xs center-xs">
                    <div className="col-xs-12">
                        <img className="grid-img" src={dino.imgUrl()} />
                    </div>
                </div>
                <div className="row center-xs">
                    <div className="col-xs-12 middle-xs">
                        Level <Number num={dino.level} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-8">
                        <div className="row">
                            <div className="col-xs-6">Attack</div>
                            <div className="col-xs-6"><Number num={info.attack} /></div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">Health</div>
                            <div className="col-xs-6"><Number num={info.health} /></div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">Revenue</div>
                            <div className="col-xs-6"><Number num={info.revenue} /></div>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="row center-xs">
                            <div className="col-xs-12">
                                <Button disabled={feedButtonDisabled} onClick={this.onFeedClick}>
                                    <div>Feed</div>
                                    <div>
                                        <Number num={dino.feedPrice()} />
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className="row center-xs">
                            <div className="col-xs-12">
                                ({dino.feedings}/5) 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function() {
        return {
            money: PlayerStore.state.money(),
            dinos: PlayerStore.state.dinos(),
            checkedDinos: PlayerStore.state.checkedDinos(),
            battlePrice: PlayerStore.state.battlePrice()
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
    onShopClick: function() {
        Actions.setPage("shop");
    },
    onBattleClick: function() {
        Actions.startBattle(this.state.checkedDinos);
    },
    render: function() {
        var battlePrice = this.state.battlePrice;
        var showBattleButton = (this.state.checkedDinos.length > 0);
        var battleButtonEnabled = ((this.state.checkedDinos.length <= 3) && (this.state.money >= battlePrice));
        return (
            <div>
                <PlayerInfoBar />
                <div className="row middle-xs">
                    <div className="col-xs-3">
                        {showBattleButton &&
                            <Button css="bigger" disabled={!battleButtonEnabled} onClick={this.onBattleClick}>
                                <div>Battle!</div>
                                <div>
                                    <Number num={this.state.battlePrice} />
                                </div>
                            </Button>
                        }
                    </div>
                    <div className="col-xs-6 center-xs">
                        <h1>My Dinos</h1>
                    </div>
                    <div className="col-xs-3 end-xs">
                        <div>
                            <Button css="bigger" onClick={this.onShopClick}>Shop</Button>
                        </div>
                    </div>
                </div>
                {(this.state.dinos.length == 0) &&
                    <div>
                        <div className="row middle-xs">
                            <div className="col-sm-8 col-sm-offset-2 col-xs-12 center-xs">
                                <p>You don't have any dinos yet.</p>
                                <p>Go to the <Button onClick={this.onShopClick}>Dino Shop</Button> to buy some now!</p>
                                <p>Each dino you buy will make you money just for owning it. And you'll win more money each time you win a battle.</p>
                                <p>In a battle, your dinos will be matched against similarly strong dinos, so you don't need to go for the most powerful ones right away.</p>
                            </div>
                        </div>
                    </div>
                }
                {(this.state.dinos.length > 0) &&
                    <div className="row">
                        {this.state.dinos.map(function(dino) {
                            return (
                                <DinoRow key={dino.id} dino={dino} money={this.state.money} />
                            );
                        }.bind(this))}
                    </div>
                }
            </div>
        );
    }
});
