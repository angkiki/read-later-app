const sha256 = require('js-sha256');
const SALT = 'Angkiki is VERY Handsome';
const request = require('request');
const cheerio = require('cheerio');

module.exports = function(db) {

  const bookmarkIndex = (request, response) => {
    // first check if the user is logged in
    let userId = request.cookies['userId'];

    if (userId !== undefined) {
        // theres a userId cookie
        // make sure the session cookie is 'real'
        let ourSessionId = sha256(userId + SALT);
        let userSessionId = request.cookies['sessionId'];

        if (ourSessionId === userSessionId) {
            db.bookmark.bookmarkIndex(userId, (err, result) => {
              if (err) {
                  const props = {
                    page: 'home',
                    flash: 'danger',
                    message: err.detail
                  }
                  response.render('application', props);
              } else {
                  const props = {
                    userId: userId,
                    page: 'bookmarks',
                    subpage: 'index',
                    bookmarks: result.rows
                  }
                  response.render('application', props);
              }
            })
        } else {
            // unauthorised access
            const props = {
              page: 'home',
              flash: 'danger',
              message: 'Unauthorised Access'
            }
            response.render('application', props);
        }
    } else {
        // unauthorised access
        const props = {
          page: 'home',
          flash: 'danger',
          message: 'Unauthorised Access'
        }
        response.render('application', props);
    }
  }

  const bookmarkNew = (request, response) => {
    // authenticate user
    let userId = request.cookies['userId']
    let userSessionId = request.cookies['sessionId'];
    let ourSessionId = sha256(userId + SALT);

    if (userId == undefined || userSessionId !== ourSessionId) {
        // user not logged in
        const props = {
          page: 'home',
          flash: 'danger',
          message: 'Unauthorised Access'
        }
        response.render('application', props);
    } else {
        // user is logged in
        const props = {
          page: 'bookmarks',
          subpage: 'new',
          userId: 'userId'
        }
        response.render('application', props);
    }
  }

  const bookmarkCreate = (request, response) => {
    let title = request.body.title;
    let url = request.body.url;
    let userId = request.body.user_id;

    db.bookmark.bookmarkCreate(title, userId, (err, result) => {
      if (err) {
          const props = {
            page: 'home',
            flash: 'danger',
            message: err.detail
          }
          response.render('application', props);
      } else {
          request(url, (error, response, body) => {
            let $ = cheerio.load(body);
            let links = $('a');

            const props = {
              userId: userId,
              flash: 'success',
              message: 'Bookmark Created',
              links: links
            }

            response.render('application', props);
          })
      }
    })
  }

  return {
    bookmarkIndex,
    bookmarkNew
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
