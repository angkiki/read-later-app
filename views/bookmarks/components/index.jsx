const React = require('react');

class Index extends React.Component {
  render() {
    if (this.props.bookmarks && this.props.bookmarks.length > 0) {
      var bookmarks = this.props.bookmarks
      // var bookmarks = [{title: "No Bookmarks Created Yet"}];
    } else {
      var bookmarks = [{title: "No Bookmarks Created Yet"}];
    }

    return (
      <div id="bookmarks-index-holder">
        <h2 className="text-center">Your Bookmarks</h2>

        <br />

        <div className="text-center">
          <a href="/bookmarks/new" className="btn btn-primary btn-md">New Bookmark</a>
        </div><br/>

        <ul className="list-group">
          {bookmarks.map(function(b) {
            return (
              <li className="list-group-item">{b.title}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

module.exports = Index;
