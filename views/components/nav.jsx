const React = require('react');

class Nav extends React.Component {
  render() {
    var userId = this.props.userId;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

            {userId == undefined &&
            <li className="nav-item">
              <a className="nav-link" href="/users/new">Register</a>
            </li>}

            {userId == undefined &&
            <li className="nav-item">
              <a className="nav-link" href="/users/login">Log In</a>
            </li>}

            {userId != undefined &&
            <li className="nav-item">
              <a className="nav-link" href="/bookmarks">Bookmarks</a>
            </li>}

            {userId != undefined &&
            <li className="nav-item">
              <a className="nav-link" href="/users/logout">Log Out</a>
            </li>}

          </ul>
        </div>
      </nav>
    )
  }
}

module.exports = Nav;
