var Actions = require("../actions/Actions.js");
var PlayerInfoBar = require("./PlayerInfoBar.js");
var Number = require("./Number.js");
var BattleStore = require("../stores/BattleStore.js");
var Util = require("../util/Util.js");
var Button = require("./Button.js");

var Dino = React.createClass({
    onSwitchClick: function() {
        Actions.battleSwitch(this.props.dino);
    },
    render: function() {
        var dino = this.props.dino;
        var className = "dino row middle-xs ";
        if (dino.isDead()) {
            className += "bg-light-grey";
        } else {
            className += Util.dinoTypeColors[dino.type()];
        }
        return (
            <div className={className}>
                <div className="logo-level col-sm-4 col-xs-2 center-xs">
                    <img className="logo" src={dino.imgUrl()} />
                    <span className="level">{dino.level}</span>
                </div>
                <div className="col-sm-6 col-xs-8">
                    <div className="row">
                        <div className="col-xs-12"><strong>{dino.name}</strong></div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">Health</div>
                        <div className="col-xs-8 end-xs"><Number num={dino.currentHealth} /></div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">Attack</div>
                        <div className="col-xs-8 end-xs"><Number num={dino.attack(this.props.target)} /></div>
                    </div>
                </div>
                <div className="col-xs-2">
                    {(this.props.index != 0) && (dino.currentHealth > 0) && (this.props.movesTaken == 0) &&
                        <Button onClick={this.onSwitchClick}>Switch</Button>}
                </div>
            </div>
        );
    }
});

var DinoList = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.dinos.map(function(dino, i) {
                    return <Dino key={dino.id} index={i} dino={dino} target={this.props.target} movesTaken={this.props.movesTaken} />;
                }.bind(this))}
            </div>
        );
    }
});

var MovesBar = React.createClass({
    onSaveClick: function() {
        Actions.battleSave();
    },
    onDefendClick: function() {
        Actions.battleDefend();
    },
    onAttackClick: function() {
        Actions.battleAttack();
    },
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-4">
                        Moves: {this.props.currentMoves} / {this.props.maxMoves}
                    </div>
                </div>
                <div className="row middle-xs">
                    <div className="col-xs-4 center-xs">
                        <Button css="bg-yellow bigger" onClick={this.onSaveClick}>
                            <div>Save</div>
                            <div>{this.props.saves}</div>
                        </Button>
                    </div>
                    <div className="col-xs-4 center-xs">
                        <Button css="bg-blue bigger" onClick={this.onDefendClick}>
                            <div>Defend</div>
                            <div>{this.props.defends}</div>
                        </Button>
                    </div>
                    <div className="col-xs-4 center-xs">
                        <Button css="bg-red bigger" onClick={this.onAttackClick}>
                            <div>Attack</div>
                            <div>
                                {this.props.attacks}
                            </div>
                            <div>
                                <Number num={this.props.currentDamage} />
                                -&gt;
                                <Number num={this.props.nextDamage} />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
});

var Log = React.createClass({
    render: function() {
        var log = this.props.log;
        var line;
        if (log.action == "ATTACK") {
            if (log.attacks > log.defends) {
                line = (<span>{log.attacker} attacked with {log.attacks}, {log.defender} defended with {log.defends}. <Number num={log.totalDamage} /> damage done!</span>);
            } else {
                line = (<span>{log.attacker} attacked with {log.attacks}, {log.defender} defended with {log.defends}. BLOCKED!</span>);
            }
        } else if (log.action == "BLOCK") {
            line = (<span>{log.defender} defended with {log.defends}</span>);
        } else if (log.action == "DINO_DIED") {
            line = (<span>{log.attacker} killed {log.defender}</span>);
        } else if (log.action == "SWITCH") {
            line = (<span>switched to {log.to}</span>);
        }
        var className = "row ";
        if (log.player) {
            className += "log-player";
        } else {
            className += "log-opponent";
        }
        return (
            <div className={className}>
                <div className="col-xs-2">
                    {log.player && "You"}
                    {!log.player && "Them"}
                </div>
                <div className="col-xs-10">
                    {line}
                </div>
            </div>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function() {
        return {
            winner: BattleStore.state.winner(),
            winnings: BattleStore.state.winnings(),
            isPlayerTurn: BattleStore.state.isPlayerTurn(),
            playerDinos: BattleStore.state.playerDinos(),
            opponentDinos: BattleStore.state.opponentDinos(),
            currentPlayerDino: BattleStore.state.currentPlayerDino(),
            currentOpponentDino: BattleStore.state.currentOpponentDino(),
            maxMoves: BattleStore.state.maxMoves(),
            currentMoves: BattleStore.state.currentMoves(),
            movesTaken: BattleStore.state.movesTaken(),
            saves: BattleStore.state.saves(),
            defends: BattleStore.state.defends(),
            attacks: BattleStore.state.attacks(),
            switches: BattleStore.state.switches(),
            currentDamage: BattleStore.state.currentDamage(),
            nextDamage: BattleStore.state.nextDamage(),
            logs: BattleStore.state.logs()
        };
    },
    componentDidMount: function() {
        BattleStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        BattleStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        if (this.isMounted()) {
            this.setState(this.getInitialState());
        }
    },
    onCollectClick: function() {
        Actions.collectWinnings(this.state.winnings);
        Actions.setPage("home");
    },
    onLeaveClick: function() {
        Actions.setPage("home");
    },
    render: function() {
        return (
            <div>
                <PlayerInfoBar />
                <h1>Battle!</h1>

                <div className="row">
                    <div className="col-sm-4 col-xs-6">
                        <DinoList dinos={this.state.playerDinos} target={this.state.currentOpponentDino} movesTaken={this.state.movesTaken} />
                    </div>
                    <div className="col-sm-4 col-sm-offset-4 col-xs-6">
                        <DinoList dinos={this.state.opponentDinos} target={this.state.currentPlayerDino} />
                    </div>
                </div>
                {(this.state.winner == null) &&
                    <div className="moves-bar row">
                        <div className="col-sm-6 col-xs-12">
                            {this.state.isPlayerTurn &&
                                <MovesBar
                                    isPlayerTurn={this.state.isPlayerTurn}
                                    maxMoves={this.state.maxMoves}
                                    currentMoves={this.state.currentMoves}
                                    saves={this.state.saves}
                                    defends={this.state.defends}
                                    attacks={this.state.attacks}
                                    currentDamage={this.state.currentDamage}
                                    nextDamage={this.state.nextDamage}
                                    />}
                        </div>
                    </div>
                }
                {(this.state.winner == "player") &&
                    <div className="game-over row middle-xs">
                        <div className="col-xs-12 center-xs">
                            <p>
                                Victory!
                            </p>
                            <p>
                                You win <Number num={this.state.winnings} />
                            </p>
                            <p>
                                <Button onClick={this.onCollectClick}>Collect</Button>
                            </p>
                        </div>
                    </div>
                }
                {(this.state.winner == "opponent") &&
                    <div className="game-over row middle-xs">
                        <div className="col-xs-12 center-xs">
                            <p>
                                Defeat!
                            </p>
                            <p>
                                <Button onClick={this.onLeaveClick}>Leave</Button>
                            </p>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-xs-12">
                        {this.state.logs.map(function(log, i) {
                            return <Log key={i} log={log} />;
                        }.bind(this))}
                    </div>
                </div>
            </div>
        );
    }
});
