const sha256 = require('js-sha256')
const querystring = require('querystring');
const SALT = 'Angkiki is VERY Handsome';

module.exports = function(db){

  const newUser = (request, response) => {
    let flash = request.query.flash;
    let message = request.query.message;

    const props = {
      page: 'user',
      subpage: 'new',
      flash: flash,
      message: message
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
              const props = querystring.stringify({
                flash: 'danger',
                message: err.detail
              });
              response.redirect('/users/new?' + props);
          } else {
              // USER SAVED
              const props = querystring.stringify({
                flash: 'success',
                message: 'Account Created Successfully'
              });
              response.redirect('/users/login?' + props);
          }
        });
    } else {
        // passwords do not match
        // redirect to new user page
        const props = querystring.stringify({
          flash: 'danger',
          message: 'Passwords Do Not Match'
        });
        response.redirect('/users/new?' + props);
    }
  }

  const newUserSession = (request, response) => {
    let flash = request.query.flash;
    let message = request.query.message;

    const props = {
      page: 'user',
      subpage: 'login',
      flash: flash,
      message: message
    }
    response.render('application', props);
  }

  const createUserSession = (request, response) => {
    let username = request.body.username;

    db.user.createUserSession(username, (err, result) => {
      if (err) {
          // db query error
          const props = querystring.stringify({
            flash: 'danger',
            message: err.detail
          });
          response.redirect('/users/login?' + props);
      } else {
          if (result.rows.length < 1) {
              // check if theres any query result first
              // if no means no such user
              const props = querystring.stringify({
                flash: 'danger',
                message: 'Incorrect Username or Password'
              });
              response.redirect('/users/login?' + props);
          } else {
              // check if passwords match
              let password = result.rows[0].password;
              let hashedPassword = sha256(request.body.password + SALT);

              if (password === hashedPassword) {
                  // successfully logged in
                  let userId = result.rows[0].id;
                  let sessionId = sha256(userId + SALT);

                  response.cookie('userId', userId);
                  response.cookie('sessionId', sessionId);

                  const props = querystring.stringify({
                    flash: 'success',
                    message: 'Logged In Successfully!'
                  });
                  response.redirect('/?' + props);
              } else {
                  // wrong password
                  const props = querystring.stringify({
                    flash: 'danger',
                    message: 'Incorrect Username or Password'
                  });
                  response.redirect('/users/login?' + props);
              }
          }
      }
    })
  }

  const destroyUserSession = (request, response) => {
    response.clearCookie('userId');
    response.clearCookie('sessionId');

    const props = querystring.stringify({
      flash: 'success',
      message: 'Logged Out Successfully'
    });
    response.redirect('/?' + props);
  }

  const newAjaxUser = (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    const responseObject = {
      username: username,
      password: password,
      foo: 'bar'
    }
    response.send(responseObject);
  }

  return {
    newUser,
    createUser,
    newUserSession,
    createUserSession,
    destroyUserSession,
    newAjaxUser
  }
};
