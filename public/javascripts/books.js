var Book = React.createClass({
    render: function() {
        
    }
});

var BookList = React.createClass({
    render: function() {
        var bookList = this.props.data.map(function(book) {
            return (<Book title={book} />)
        });
        return (<div>{bookList}</div>);
    }
});

var SearchResult = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                // todo error-p
                this.setState({data: data.data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (<BookList data={this.state.data} />)
    }
});

var SearchInput = React.createClass({
    handleOnChange: function() {
        var q = this.query.value;
        console.log(q)
    },
    render: function() {
        return (<div id="books">
                    <input
                        type="text"
                        placeholder="search"
                        onChange={this.handleOnChange}
                        ref={(x) => this.query = x}
                    />
                    <SearchResult url="/api/1/books">
                    </SearchResult>
                </div>
        );
    }
});

ReactDOM.render(
    <SearchInput />,
    document.getElementById('search')
);

