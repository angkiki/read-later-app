const React = require('react');
const New = require('./components/new');
const Search = require('./components/search')

class Link extends React.Component {
  render() {
    let subpage = this.props.subpage;
    switch(subpage) {
      case "new":
        var currentPage = <New links={this.props.links} bookmarksId={this.props.bookmarksId} />
        break;
      case "search":
        var currentPage = <Search links={this.props.links} />
    }
    return (
      <div id="main-links-holder">
        {currentPage}
      </div>
    )
  }
}

module.exports = Link;
