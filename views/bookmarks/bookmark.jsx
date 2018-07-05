const React = require('react');
const Index = require('./components/index');
const New = require('./components/new');
const Show = require('./components/show');

class Bookmark extends React.Component {
  render() {
    let subpage = this.props.subpage;
    switch(subpage) {
      case 'index':
        var currentPage = <Index bookmarks={this.props.bookmarks}/>
        break;
      case 'new':
        var currentPage = <New userId={this.props.userId} />
        break;
      case 'show':
        var currentPage = <Show result={this.props.result} />
        break;
    }
    return (
      <div id="main-bookmark-holder">
        {currentPage}
      </div>
    )
  }
}

module.exports = Bookmark;
