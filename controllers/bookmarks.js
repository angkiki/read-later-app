const sha256 = require('js-sha256');
const SALT = 'Angkiki is VERY Handsome';

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

  const bookmarkGet = (request, response) => {
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
          subpage: 'get',
          userId: 'userId'
        }
        response.render('application', props);
    }
  }

  return {
    bookmarkIndex,
    bookmarkGet
  }
}
