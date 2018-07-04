module.exports = function(db){

  const bookmarkIndex = function(userId, callback) {
    const queryString = 'SELECT * FROM bookmarks INNER JOIN users ON bookmarks.user_id = users.id WHERE users.id = $1';
    const values = [userId];
    db.query(queryString, values, callback);
  }

  const bookmarkCreate = function(title, userId, callback) {
    const queryString = 'INSERT INTO bookmarks(title, userId) VALUES($1, $2)';
    const values = [title, userId];
    db.query(queryString, values, callback);
  }

  return {
    bookmarkIndex,
    bookmarkCreate
  }
}
