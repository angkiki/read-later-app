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
                    <a href={link.url}>{link.description}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Show;