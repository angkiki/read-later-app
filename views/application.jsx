const React = require('react');
const Nav = require('./components/nav');
const Flash = require('./components/flash');
const Home = require('./home');
const User = require('./users/user_main');

class Application extends React.Component {
  render() {
    if (this.props.flash) {
      var flash = <Flash flash={this.props.flash} message={this.props.message} />
    } else {
      var flash = <div></div>
    }

    let page = this.props.page;
    let userId = this.props.userId;

    switch(page) {
      case 'home':
        var currentPage = <Home/>
        break;
      case 'user':
        var currentPage = <User subpage={this.props.subpage} />
        break;
    }

    return(
      <html>
        <head>
          <title>Angkiki - Read Later</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous" />
        </head>
        <body>
          <Nav userId={userId} />
          {flash}
          <div className="container">
            {currentPage}
          </div>
        </body>
      </html>
    )
  }
}

module.exports = Application;
