module.exports = function(db){

  const createUser = function(username, password, callback) {
    const queryString = 'INSERT INTO users(username, password) VALUES($1, $2)';
    const values = [username, password];
    db.query(queryString, values, callback);
  }

  const createUserSession = function(username, callback) {
    console.log(db);
    const queryString = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    db.query(queryString, values, callback);
  }

  return {
      createUser,
      createUserSession
  };

};
