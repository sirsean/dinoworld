var Actions = require("../actions/Actions.js");
var PlayerInfoBar = require("./PlayerInfoBar.js");
var Number = require("./Number.js");
var BattleStore = require("../stores/BattleStore.js");
var Util = require("../util/Util.js");

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
                <div className="col-xs-2 center-xs">
                    {dino.level}
                </div>
                <div className="col-xs-8">
                    <div className="row">
                        <div className="col-xs-12">{dino.name}</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">Health</div>
                        <div className="col-xs-8 end-xs"><Number num={dino.currentHealth} to={2} /></div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">Attack</div>
                        <div className="col-xs-8 end-xs"><Number num={dino.attack(this.props.target)} to={2} /></div>
                    </div>
                </div>
                <div className="col-xs-2">
                    {(this.props.index != 0) && (dino.currentHealth > 0) && (this.props.movesTaken == 0) &&
                        <button onClick={this.onSwitchClick}>Switch</button>}
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
                <div className="row">
                    <div className="col-xs-4 center-xs bg-yellow">
                        <button onClick={this.onSaveClick}>Save</button>
                    </div>
                    <div className="col-xs-4 center-xs bg-blue">
                        <button onClick={this.onDefendClick}>Defend</button>
                    </div>
                    <div className="col-xs-4 center-xs bg-red">
                        <button onClick={this.onAttackClick}>Attack</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4 center-xs bg-yellow">
                        {this.props.saves}
                    </div>
                    <div className="col-xs-4 center-xs bg-blue">
                        {this.props.defends}
                    </div>
                    <div className="col-xs-4 center-xs bg-red">
                        {this.props.attacks}
                        <br />
                        <Number num={this.props.currentDamage} to={2} />
                        -&gt;
                        <Number num={this.props.nextDamage} to={2} />
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
                line = (<span>{log.attacker} attacked with {log.attacks}, {log.defender} defended with {log.defends}. <Number num={log.totalDamage} to={2} /> damage done!</span>);
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
            className += "bg-green";
        } else {
            className += "bg-red";
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
                                You win <Number num={this.state.winnings} to={2} />
                            </p>
                            <p>
                                <button onClick={this.onCollectClick}>Collect</button>
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
                                <button onClick={this.onLeaveClick}>Leave</button>
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
