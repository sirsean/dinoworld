var Actions = require("../actions/Actions.js");
var PlayerStore = require("../stores/PlayerStore.js");
var PlayerInfoBar = require("./PlayerInfoBar.js");
var Number = require("./Number.js");
var Util = require("../util/Util.js");

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
        var className = "grid-row row middle-xs " + Util.dinoTypeColors[dino.type()];
        return (
            <div key={dino.id} className={className}>
                <div className="col-sm-1 col-xs-2 center-xs">
                    <input
                        type="checkbox"
                        checked={dino.checked}
                        onChange={this.onCheckChanged} />
                </div>
                <div className="col-md-3 col-sm-2 col-xs-6">{dino.name}</div>
                <div className="col-sm-1 col-xs-3 center-xs"><Number num={dino.level} /></div>
                <div className="col-sm-1 col-xs-2 end-xs"><Number num={info.health} to="2" /></div>
                <div className="col-sm-1 col-xs-2 end-xs"><Number num={info.attack} to="2" /></div>
                <div className="col-sm-1 col-xs-2 end-xs"><Number num={info.revenue} to="2" /></div>
                <div className="col-md-4 col-sm-5 col-xs-4 center-xs">
                    <div className="row middle-xs">
                        <div className="col-sm-offset-3 col-sm-2 col-xs-4">
                            ({dino.feedings}/5) 
                        </div>
                        <div className="col-sm-2 col-xs-6">
                            <Number num={dino.feedPrice()} to={2} />
                        </div>
                        <div className="col-sm-2 col-xs-2">
                            <button disabled={feedButtonDisabled} onClick={this.onFeedClick}>
                                Feed
                            </button>
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
                            <div>
                                <div>
                                    <Number num={this.state.battlePrice} to={2} />
                                </div>
                                <div>
                                    <button disabled={!battleButtonEnabled} onClick={this.onBattleClick}>
                                        Battle!
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-xs-6 center-xs">
                        <h1>My Dinos</h1>
                    </div>
                    <div className="col-xs-3 end-xs">
                        <div>
                            <button onClick={this.onShopClick}>Shop</button>
                        </div>
                    </div>
                </div>
                {(this.state.dinos.length == 0) &&
                    <div>
                        <div className="row middle-xs">
                            <div className="col-sm-8 col-sm-offset-2 col-xs-12 center-xs">
                                <p>You don't have any dinos yet.</p>
                                <p>Go to the <button onClick={this.onShopClick}>Dino Shop</button> to buy some now!</p>
                                <p>Each dino you buy will make you money just for owning it. And you'll win more money each time you win a battle.</p>
                                <p>In a battle, your dinos will be matched against similarly strong dinos, so you don't need to go for the most powerful ones right away.</p>
                            </div>
                        </div>
                    </div>
                }
                {(this.state.dinos.length > 0) &&
                    <div>
                        <div className="row bottom-xs">
                            <div className="col-sm-1 col-xs-2 center-xs"></div>
                            <div className="col-md-3 col-sm-2 col-xs-6">Name</div>
                            <div className="col-sm-1 col-xs-3 center-xs">Level</div>
                            <div className="col-sm-1 col-xs-2 end-xs">Health</div>
                            <div className="col-sm-1 col-xs-2 end-xs">Attack</div>
                            <div className="col-sm-1 col-xs-2 end-xs">Revenue</div>
                            <div className="col-md-4 col-sm-5 col-xs-4 center-xs">Feed</div>
                        </div>
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
