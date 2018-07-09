const React = require('react');

class Show extends React.Component {
  render() {
    let bookmarkName = this.props.result[0].title;

    return (
      <div id="bookmark-show-holder">

        <h3 className="text-center">{bookmarkName}</h3>

        <br />

        <div className="row">
          <div className="col-md-6 ml-auto mr-auto">
            <ul className="list-group">
              {this.props.result.map(function(link) {
                return(
                  <li className="list-group-item">
                    <a href={link.url} target="_blank">{link.description}</a>
                    <form style={{display: 'inline-block', float: 'right'}} method="POST" action={"/links/" + link.id + "/delete?_method=delete"}>
                      <input type="submit" className="btn btn-xs btn-danger" value="x" />
                    </form>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <br />

        <div className="text-center">
          <a className="btn btn-md btn-danger" href="/bookmarks">Back</a>
        </div>
      </div>
    )
  }
}

module.exports = Show;
