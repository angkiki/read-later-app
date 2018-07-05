const React = require('react');

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Angkiki's Bookmark-er App</h1>

        <hr />
        <br />

        <p>
          Hello! I see that you're interested in this app! This app has been put together using <span className="badge badge-secondary">NodeJs</span>, along with <span className="badge badge-secondary">Express</span> and <span className="badge badge-secondary">React</span> as the templating engine! Its purpose is really simple -- For you to store the links within articles you are reading, so that you can access them later.
          <h5>TL: DR;</h5>
          It helps ensure you don't have a <strong>million</strong> tabs open on Google Chrome.
        </p>

        <br/>

        <h5>How To Use:</h5>
        <ol>
          <h6><li>Create an Account</li></h6>
          <h6><li>Click on Bookmarks</li></h6>
          <h6><li>Click on New Bookmark</li></h6>
          <h6><li>Enter a title that will help you remember what the article is about</li></h6>
          <h6><li>Enter the URL of the article & click Submit</li></h6>
          <h6><li>Choose the URL's you wish to retain</li></h6>
          <h6><li>Tadah! You're Done!</li></h6>
        </ol>
      </div>
    )
  }
}

module.exports = Home;
