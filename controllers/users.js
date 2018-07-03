const sha256 = require('js-sha256')
const SALT = 'Angkiki is VERY Handsome';

module.exports = function(db){

  const newUser = (request, response) => {
    const props = {
      page: 'user',
      subpage: 'new'
    }
    response.render('application', props);
  };

  const createUser = (request, response) => {
    let username = request.body.username;
    let password = request.body.password;
    let passwordConfirmation = request.body.password_confirmation;

    if (password === passwordConfirmation) {
        // hash the password
        let hashedPassword = sha256(password + SALT);
        db.user.createUser(username, hashedPassword, (err, result) => {
          if (err) {
              // DB ERROR
              const props = {
                page: 'user',
                subpage: 'new',
                flash: 'danger',
                message: err.detail
              }
              response.render('application', props);
          } else {
              // USER SAVED
              const props = {
                page: 'home',
                flash: 'success',
                message: 'Account Created Successfully'
              }
              response.render('application', props);
          }
        });

    } else {
        // passwords do not match
        // redirect to new user page
        const props = {
          page: 'user',
          subpage: 'new',
          flash: 'danger',
          message: 'Passwords Do Not Match'
        }

        response.render('application', props);
    }
  }

  const newUserSession = (request, response) => {
    const props = {
      page: 'user',
      subpage: 'login'
    }

    response.render('application', props);
  }

  const createUserSession = (request, response) => {
    let username = request.body.username;

    db.user.createUserSession(username, (err, result) => {
      if (err) {
          // no such username ?
          const props = {
            page: 'user',
            subpage: 'login',
            flash: 'danger',
            message: err.detail
          }
          response.render('application', props);
      } else {
          let password = result.rows[0].password;
          let hashedPassword = sha256(request.body.password + SALT);

          if (password === hashedPassword) {
              // successfully logged in
              let userId = result.rows[0].id;
              let sessionId = sha256(userId + SALT);

              response.cookie('userId', userId);
              response.cookie('sessionId', sessionId);

              const props = {
                userId: userId,
                page: 'home',
                flash: 'success',
                message: 'Logged In Successfully!'
              }
              response.render('application', props);
          } else {
              // wrong password
              const props = {
                page: 'user',
                subpage: 'login',
                flash: 'danger',
                message: 'Incorrect Password'
              }
              response.render('application', props);
          }
      }
    })
  }

  const destroyUserSession = (request, response) => {
    response.clearCookie('userId');
    response.clearCookie('sessionId');

    const props = {
      page: 'home',
      flash: 'success',
      message: 'Logged Out Successfully'
    }
    response.render('application', props);
  }

  return {
    newUser,
    createUser,
    newUserSession,
    createUserSession,
    destroyUserSession
  }
};
