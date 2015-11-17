var MessageStore = require("../stores/MessageStore.js");

var Message = React.createClass({
    render: function() {
        return (
            <div className="message row">
                <div className="col-xs-12">
                    {this.props.message.text}
                </div>
            </div>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function() {
        return {
            messages: MessageStore.state.messages()
        };
    },
    componentDidMount: function() {
        MessageStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        MessageStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        if (this.isMounted()) {
            this.setState(this.getInitialState());
        }
    },
    render: function() {
        return (
            <div className="messages row">
                <div className="col-xs-12">
                    {this.state.messages.map(function(m) {
                        return <Message key={m.id} message={m} />;
                    }.bind(this))}
                </div>
            </div>
        );
    }
});
