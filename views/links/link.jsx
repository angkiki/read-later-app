const React = require('react');
const New = require('./components/new');

class Link extends React.Component {
  render() {
    let subpage = this.props.subpage;
    switch(subpage) {
      case "new":
        var currentPage = <New links={this.props.links} bookmarkId={this.props.bookmarkId} />
        break;
    }
    return (
      <div id="main-links-holder">
        {currentPage}
      </div>
    )
  }
}

module.exports = Link;
