const sha256 = require('js-sha256');
const SALT = 'Angkiki is VERY Handsome';
const querystring = require('querystring');

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
                  const props = querystring.stringify({
                    flash: 'danger',
                    message: err.detail
                  })
                  response.redirect('/?' + props);
              } else {
                  let flash = request.query.flash;
                  let message = request.query.message;

                  const props = {
                    userId: userId,
                    page: 'bookmarks',
                    subpage: 'index',
                    bookmarks: result.rows,
                    flash: flash,
                    message: message
                  }
                  response.render('application', props);
              }
            })
        } else {
            // unauthorised access
            const props = querystring.stringify({
              flash: 'danger',
              message: 'Unauthorised Access'
            })
            response.redirect('/?' + props);
        }
    } else {
        // unauthorised access
        const props = querystring.stringify({
          flash: 'danger',
          message: 'Unauthorised Access'
        })
        response.redirect('/?' + props);
    }
  }

  const bookmarkNew = (request, response) => {
    // authenticate user
    let userId = request.cookies['userId']
    let userSessionId = request.cookies['sessionId'];
    let ourSessionId = sha256(userId + SALT);

    if (userId == undefined || userSessionId !== ourSessionId) {
        // user not logged in
        const props = querystring.stringify({
          flash: 'danger',
          message: 'Unauthorised Access'
        });
        response.redirect('/?' + props);
    } else {
        // user is logged in
        const props = {
          page: 'bookmarks',
          subpage: 'new',
          userId: userId
        }
        response.render('application', props);
    }
  }

  const bookmarkCreate = (request, response) => {
    let title = request.body.title;
    let url = request.body.url;
    let userId = request.body.user_id;
    console.log('userid = ' + userId);

    db.bookmark.bookmarkCreate(title, userId, (err, result) => {
      if (err) {
          console.log('Query Err: ', err.stack);
          const props = querystring.stringify({
            flash: 'danger',
            message: err.detail
          })
          response.redirect('/?' + props);
      } else {
          let bookmarkId = result.rows[0].id
          const props = querystring.stringify({
            flash: 'success',
            message: 'Bookmark Created',
            url: url
          })
          response.redirect('/links/' + bookmarkId + '/new?' + props);
      }
    })
  }

  const bookmarkShow = (request, response) => {
    // authenticate user
    let userId = request.cookies['userId'];
    let userSessionId = request.cookies['sessionId'];
    let ourSessionId = sha256(userId + SALT);

    if (userId == undefined || userSessionId !== ourSessionId) {

    } else {
        // user is authenticated
        let bookmarkId = request.params.id;
        db.bookmark.bookmarkShow(bookmarkId, (err, result) => {
          if (err) {
              console.log('ERROR: ', err.stack);
              // database query error
              const props = querystring.stringify({
                flash: 'danger',
                message: err.detail
              })
              response.redirect('/bookmarks?' + props);
          } else {
              console.log('RESULT: ', result.rows[0]);

              const props = {
                page: 'bookmarks',
                subpage: 'show',
                userId: userId,
                result: result.rows
              }
              response.render('application', props);
          }
        })
    }
  }

  return {
    bookmarkIndex,
    bookmarkNew,
    bookmarkCreate,
    bookmarkShow
  }
}
