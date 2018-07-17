module.exports = function(db) {

  const createAjaxLink = async function(username, bookmarkURL, linksArray, callback) {
    let userQueryValue = [username];
    let userQueryString = 'SELECT * FROM users WHERE username = $1';

    try {
      let user = await db.query(userQueryString, userQueryValue);
      var userId = user.rows[0].id;
    } catch(e) {
      var userId = null;
    }

    if (userId === null) {
      return callback(true, null);
    }

    let bookmarkQueryValue = [bookmarkURL, userId];
    let bookmarkQueryString = 'INSERT INTO bookmarks(title, user_id) VALUES($1, $2) RETURNING *';

    try {
      let bookmark = await db.query(bookmarkQueryString, bookmarkQueryValue);
      var bookmarkId = bookmark.rows[0].id;
    } catch(e) {
      var bookmarkId = null;
    }

    if (bookmarkId === null) {
      return callback(true, null);
    }

    var linkResults = [];
    var linkErrors = [];

    let linksQueryString = 'INSERT INTO links(description, url, bookmark_id) VALUES($1, $2, $3)'
    for (let j = 0; j<linksArray.length; j++) {
      let description = linksArray[j][0];
      let url = linksArray[j][1];

      let linkQueryValues = [description, url, bookmarkId];

      try {
        let link = await db.query(linksQueryString, linkQueryValues);
        linkResults.push(link);
      } catch(e) {
        console.log('ERROR!!! ', e);
        linkErrors.push(e);
      }
    }

    callback(linkErrors.length, null);
  }

  const createLink = async function(bookmarkId, checkBoxArray, titleArray, urlArray, callback) {
    const queryArray = [] // title, url
    const queryString = 'INSERT INTO links(description, url, bookmark_id) VALUES($1, $2, $3)'

    for (let i = 0; i < checkBoxArray.length; i++) {

      if (checkBoxArray[i].length > 1) {
        let title = titleArray[i];
        let url = urlArray[i]

        queryArray.push([title, url]);
      }
    }

    const err = [];
    const result = [];

    for (let j = 0; j < queryArray.length; j++) {
      let values = [queryArray[j][0], queryArray[j][1], bookmarkId];

      try {
          let res = await db.query(queryString, values);
          result.push(res);
      } catch (error) {
          console.log('ERROR: ', error);
          err.push(error);
      }
    }

    callback(err, result);

  }

  const deleteLink = function(linkId, callback) {
    const queryString = "DELETE FROM links WHERE id = $1 RETURNING *";
    const values = [linkId];

    db.query(queryString, values, callback);
  }

  const searchLink = async function(queryParam, userId, callback) {
    const queryString = "SELECT description,url,search FROM links INNER JOIN bookmarks ON links.bookmark_id = bookmarks.id INNER JOIN users ON bookmarks.user_id = users.id WHERE users.id = $1";
    const values = [userId];

    db.query(queryString, values, (err, result) => {
      if (err) {
          callback(err, null)
      } else {
          let resultArray = [];
          let joinArray = result.rows;

          for (let i = 0; i < joinArray.length; i++) {
            let searchDowncase = joinArray[i].search.toLowerCase();
            let queryParamDowncase = queryParam.toLowerCase();

            if (searchDowncase.includes(queryParamDowncase)) {
              resultArray.push(joinArray[i])
            }
          }

          callback(null, resultArray);
      }
    })
  }

  return {
    createLink,
    deleteLink,
    createAjaxLink,
    searchLink
  }
}
