const React = require('react');

class New extends React.Component {
  render() {

    return (
      <div id="bookmarks-get-holder">
        <h3 className="text-center">New Bookmark</h3>

        <form method="POST" action="/bookmarks/new">
          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="title">Bookmark Name</label>
                <input type="text" className="form-control" placeholder="Your Bookmark Name!" name="title" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="url">URL</label>
                <input type="text" className="form-control" placeholder="Paste URL here!" name="url" />
              </div>
            </div>
          </div>

          <input type="hidden" name="user_id" value={this.props.userId} />

          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-md">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = New;
