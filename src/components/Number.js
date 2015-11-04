module.exports = React.createClass({
    render: function() {
        var num = this.props.num;
        var to = this.props.to || 0;
        return (
            <span>{(Math.round(num * Math.pow(10, to)) / Math.pow(10, to)).toFixed(to)}</span>
        );
    }
});
