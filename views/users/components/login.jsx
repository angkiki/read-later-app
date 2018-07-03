const React = require('react');

class NewUserSession extends React.Component {
  render() {
    return (
      <form action='/users/login' method='POST'>

        <div className="row">
          <div className="col-md-6 ml-auto mr-auto">
            <div className="form-group">
              <label for="username">Username</label>
              <input type="text" className="form-control" placeholder="Enter username" name="username" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 ml-auto mr-auto">
            <div className="form-group">
              <label for="password">Password</label>
              <input type="password" className="form-control" placeholder="Password" name="password" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-md">Submit</button>
        </div>
      </form>
    )
  }
}

module.exports = NewUserSession;
