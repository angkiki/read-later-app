module.exports = function(db){

  const bookmarkIndex = function(userId, callback) {
    const queryString = 'SELECT * FROM users INNER JOIN bookmarks ON users.id = bookmarks.user_id WHERE users.id = $1';
    const values = [userId];
    db.query(queryString, values, callback);
  }

  const bookmarkCreate = function(title, userId, callback) {
    const queryString = 'INSERT INTO bookmarks(title, user_id) VALUES($1, $2) RETURNING *';
    const values = [title, userId];
    db.query(queryString, values, callback);
  }

  const bookmarkShow = function(bookmarkId, callback) {
    const queryString = 'SELECT * FROM bookmarks INNER JOIN links ON bookmarks.id = links.bookmark_id WHERE bookmarks.id = $1';
    const values = [bookmarkId];
    db.query(queryString, values, callback);
  }

  return {
    bookmarkIndex,
    bookmarkCreate,
    bookmarkShow
  }
}
