var Book = React.createClass({
    render: function () {
        return <li key={this.props.title}>{this.props.title}</li>
    }
});

var BookList = React.createClass({
    render: function () {
        var filter = this.props.filter.toLowerCase();
        return (<ul>{this.props.data
            .map(function (book) {
                return <Book key={book} title={book}/>
            }).filter(function (book) {
                var title = book.props.title.toLowerCase();
                return title.indexOf(filter) != -1;
            })}</ul>);
    }
});

var SearchResult = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                // todo error-p
                this.setState({data: data.data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return <BookList data={this.state.data} filter={this.props.filter}/>
    }
});

var SearchInput = React.createClass({
    getInitialState: function () {
        return {filter: ""};
    },
    handleOnChange: function () {
        this.setState({filter: this.query.value})
    },
    render: function () {
        return (<div id="books">
                <input
                    type="text"
                    placeholder="search"
                    onChange={this.handleOnChange}
                    ref={(x) => this.query = x}
                />
                <SearchResult url="/api/1/books" filter={this.state.filter} />
            </div>
        );
    }
});

ReactDOM.render(
    <SearchInput />,
    document.getElementById('search')
);

