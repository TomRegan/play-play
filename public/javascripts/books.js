var SearchInput = React.createClass({
    handleOnChange: function() {
        console.log("change")
    },
    render: function() {
        return (<input
                    type="text"
                    placeholder="search"
                    onChange={this.handleOnChange}
                />
        );
    }
});

ReactDOM.render(
    <SearchInput />,
    document.getElementById('search')
);

