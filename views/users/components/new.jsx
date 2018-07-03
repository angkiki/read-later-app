const React = require('react');

class NewUser extends React.Component {
  render() {
    return (
      <form action='/users/new' method='POST'>

        <div className="row">
          <div className="col-md-6 ml-auto mr-auto">
            <div className="form-group">
              <label for="username">Username</label>
              <input type="text" className="form-control" placeholder="Enter username" name="username" />
              <small className="form-text text-muted">Username Must Be Unique</small>
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

        <div className="row">
          <div className="col-md-6 ml-auto mr-auto">
            <div className="form-group">
              <label for="password">Password Confirmation</label>
              <input type="password" className="form-control" placeholder="Password Confirmation" name="password_confirmation" />
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

module.exports = NewUser;
