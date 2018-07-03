const React = require('react');
const Index = require('./components/index')
const Get = require('./components/get')

class Bookmark extends React.Component {
  render() {
    let subpage = this.props.subpage;
    switch(subpage) {
      case 'index':
        var currentPage = <Index bookmarks={this.props.bookmarks}/>
        break;
      case 'get':
        var currentPage = <Get />
    }
    return (
      <div id="main-bookmark-holder">
        {currentPage}
      </div>
    )
  }
}

module.exports = Bookmark;
