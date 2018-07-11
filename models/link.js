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

    console.log('WOOHOO FOUND USER');

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

    console.log('WOOHOO CREATED BOOKMARKS')

    var linkResults = [];
    var linkErrors = [];

    let linksQueryString = 'INSERT INTO links(description, url, bookmark_id) VALUES($1, $2, $3)'
    for (let j = 0; j<linksArray.length; j++) {
      let description = linksArray[j][0];
      let url = linksArray[j][1];

      let values = [description, url, bookmarkId];

      try {
        let link = await db.query(linksQueryString)
        linkResults.push(link);
      } catch(e) {
        linkErrors.push(e);
      }
    }

    console.log('WOOHOO DONE WITH LINKS!');

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



  return {
    createLink,
    deleteLink,
    createAjaxLink
  }
}
