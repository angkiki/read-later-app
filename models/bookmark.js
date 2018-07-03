module.exports = function(db){

  const bookmarkIndex = function(userId, callback) {
    const queryString = 'SELECT * FROM bookmarks INNER JOIN users ON bookmarks.user_id = users.id WHERE users.id = $1';
    const values = [userId];
    db.query(queryString, values, callback);
  }

  return {
    bookmarkIndex
  }
}
