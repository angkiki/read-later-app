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

        REQUEST(url, (error, res, body) => {
          var $ = cheerio.load(body);
          var links = $('a');
          const linkArray = [];

          for (let i = 0; i < links.length; i++) {
            if (links[i].children[0].data !== undefined) {
              linkArray.push(links[i]);
              // console.log('links: ', links[i]);
            }
          };

          const props = {
            page: 'links',
            subpage: 'new',
            bookmarksId: bookmarksId,
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
    let titleArray = request.body.title;
    let urlArray = request.body.url;
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
