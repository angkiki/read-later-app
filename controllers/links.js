const sha256 = require('js-sha256');
const SALT = 'Angkiki is VERY Handsome';

module.exports = function(db) {

  const linkIndex = (request, response) => {
    // first check if the user is logged in
    let userId = request.cookies['userId'];

    if (userId !== undefined) {
        // theres a userId cookie
        // make sure the session cookie is 'real'
        let ourSessionId = sha256(userId + SALT);
        let userSessionId = request.cookies['sessionId'];

        if (ourSessionId === userSessionId) {
            db.link.linkIndex(userId, (err, result) => {
              if (err) {
                  const props = {
                    page: 'home',
                    flash: 'danger',
                    message: err.detail
                  }
                  response.render('application', props);
              } else {
                  const props = {
                    page: 'link',
                    subpage: 'index'
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
}
