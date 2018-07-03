const React = require('react');

class Flash extends React.Component {
  render() {
    let flash = this.props.flash
    let status = "alert alert-" + flash
    let message = this.props.message

    return (
      <div className={status} role="alert">
        {message}
      </div>
    )
  }
}

module.exports = Flash;
