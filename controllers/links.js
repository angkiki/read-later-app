const sha256 = require('js-sha256');
const SALT = 'Angkiki is VERY Handsome';
const REQUEST = require('request');
const cheerio = require('cheerio');
const querystring = require('querystring');

module.exports = function(db) {

  const newLink = (request, response) => {
    // authenticate user
    let userId = request.cookies['userId'];
    let userSessionId = request.cookies['sessionId'];
    let ourSessionId = sha256(userId + SALT);

    if (userId == undefined || userSessionId != ourSessionId) {
        // user not authenticated
        const props = querystring.stringify({
          flash: 'danger',
          message: 'Unauthorised Access'
        })
        response.redirect('/?' + props);
    } else {
        let bookmarksId = request.params.id;
        let url = request.query.url;
        let protocol = url.slice(0,4);

        if (protocol !== 'http') {
          url = 'https://' + url;
        }

        REQUEST(url, (error, res, body) => {
          var $ = cheerio.load(body);
          var links = $('a');
          const linkArray = [];

          for (let i = 0; i < links.length; i++) {
            let url = links[i].attribs.href;
            let protocol = url.slice(0,4);

            if (links[i].children && links[i].children[0].data !== undefined && protocol === 'http') {
              linkArray.push(links[i]);
            }
          };

          const props = {
            page: 'links',
            subpage: 'new',
            bookmarksId: bookmarksId,
            userId: userId,
            links: linkArray
          }

          response.render('application', props)
        })
    }
  }

  const createLink = (request, response) => {
    // returns single '0' if link was unchecked
    // returns array of ['1', '0'] if link was checked
    let checkBoxArray = request.body.link;
    let titleArray = request.body.data;
    let urlArray = request.body.url;
    let bookmarkId = request.params.id;

    console.log('YOOOOOOOOOOO');

    db.link.createLink(bookmarkId, checkBoxArray, titleArray, urlArray, (err, result) => {
      console.log('HELLLOOOOOOOOO MUDDA FAKAAAA')
      console.log(err);

      if (err && err.length > 0) {
          const props = querystring.stringify({
            flash: 'warning',
            message: err.length + ' Links Failed To Save'
          })
          response.redirect('/bookmarks?' + props);
      } else {
          const props = querystring.stringify({
            flash: 'success',
            message: 'Links Successfully Saved!'
          })
          response.redirect('/bookmarks?' + props);
      }
    })
  }

  return {
    newLink,
    createLink
  }
}

// const url = "https://medium.com/productivity-freak/my-atom-editor-setup-for-js-react-9726cd69ad20"
// request(url, (error, response, body) => {
//   var $ = cheerio.load(body);
//   var links = $('a');
//   for (let i = 0; i < links.length; i++) {
//     console.log(links[i].children[0].data + ': ' + links[i].attribs.href);
//   }
// })
