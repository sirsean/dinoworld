module.exports = React.createClass({
    onClick: function() {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick();
        }
    },
    render: function() {
        var className = "button";
        if (this.props.css) {
            className += " " + this.props.css;
        }
        if (this.props.disabled) {
            className += " disabled";
        }
        return (
            <div className={className} onClick={this.onClick}>
                {this.props.children}
            </div>
        );
    }
});
