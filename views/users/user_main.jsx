const React = require('react');
const NewUser = require('./components/new');
const NewUserSession = require('./components/login');

class UserMain extends React.Component {
  render() {
    let subpage = this.props.subpage

    switch(subpage) {
      case 'new':
        var title = "New User"
        var currentPage = <NewUser />
        break;
      case 'login':
        var title = "Log In"
        var currentPage = <NewUserSession />
        break;
    }
    return (
      <div id="user-main-holder">
        <h3 className="text-center">{title}</h3>
        {currentPage}
      </div>
    )
  }
}

module.exports = UserMain;
