const React = require('react');

class Get extends React.Component {
  render() {
    return (
      <div id="bookmarks-get-holder">
        <h3 className="text-center">New Bookmark</h3>

        <form action='/bookmarks/create' method='GET'>
          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="form-group">
                <label for="url">URL</label>
                <input type="text" className="form-control" placeholder="Paste URL here!" name="url" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-md">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = Get;
