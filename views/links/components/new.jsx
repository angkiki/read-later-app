const React = require('react')

class NewLink extends React.Component {
  render() {
    return (
      <div id="new-links-holder">
        <h3 className="text-center">Save Links</h3>

        <form method="POST" action="/links/new">
          <table className="table-bordered" id="new-links-table">
            <tr>
              <th className="new-links-th-td">Save?</th>
              <th className="new-links-th-td">Title</th>
              <th className="new-links-th-td">URL</th>
            </tr>

            {this.props.links.map(function(link, i) {
              return (
                <tr>
                  <td className="new-links-th-td">
                    <input type="checkbox" checked="true" name={"link[" + i + "]"} className="new-links-checkbox" />
                  </td>
                  <td className="new-links-th-td">{link.children[0].data}</td>
                  <td className="new-links-th-td">{link.attribs.href}</td>
                  <input type="hidden" name={"data[" + i + "]"} value={link.children[0].data} />
                  <input type="hidden" name={"url[" + i + "]"} value={link.attribs.href} />
                </tr>
              )
            })}
          </table>

          <br />

          <div className="text-center">
            <button type="submit" className="btn btn-md btn-primary">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = NewLink;
