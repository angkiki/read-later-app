const React = require('react')

class NewLink extends React.Component {
  render() {
    return (
      <div id="new-links-holder">
        <h3 className="text-center">Save Links</h3>

        <ul className="list-group">
          {this.props.links.map(function(l) {
            return(
              <li className="list-group-item">{l.children[0].data + ' | ' + l.attribs.href}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

module.exports = NewLink;
