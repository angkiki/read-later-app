module.exports = function(db) {

  const linkIndex = function(userId, callback) {
    const queryString = 'SELECT * FROM links INNER JOIN users ON links.user_id = users.id WHERE users.id = $1';
    const values = [userId];
    db.query(queryString, values, callback);
  }
}
