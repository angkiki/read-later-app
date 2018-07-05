const React = require('react');

class Footer extends React.Component {
  render() {
    return(
      <div className="text-center" id="footer">
        <p id="footer-text">Made With <span style={{color: 'red'}}>&hearts;</span> by Angkiki on <span className="badge badge-info">NodeJS</span></p>
      </div>
    )
  }
}

module.exports = Footer;
