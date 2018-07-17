const React = require('react');

class Search extends React.Component {
  render() {
    return (
      <div id="search-holder">
        <h3 className="text-center">Search Results</h3>
        <div className="row">
          <div className="col-md-6 ml-auto mr-auto">
            <ul className="list-group">
              {this.props.links.map((link) => {
                return (
                  <li className="list-group-item">
                    <a href={link.url} target="_blank">{link.description}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <br />
        <br />

        <div className="text-center">
          <a href="/bookmarks" className="btn btn-danger btn-md">Back</a>
        </div>
      </div>
    )
  }
}

module.exports = Search;
