module.exports = function(db) {

  const createLink = async function(bookmarkId, checkBoxArray, titleArray, urlArray, callback) {
    const queryArray = [] // title, url
    const queryString = 'INSERT INTO links(description, url, bookmark_id) VALUES($1, $2, $3)'

    for (let i = 0; i < checkBoxArray.length; i++) {

      if (checkBoxArray[i].length > 1) {
        console.log('HUGE ASS CHECKBOX MY BALLZSX')
        let title = titleArray[i];
        let url = urlArray[i]

        queryArray.push([title, url]);
      }
    }

    const err = [];
    const result = [];

    for (let j = 0; j < queryArray.length; j++) {
      console.log('FOR FOR FOR FOR FOR FOR FORRRRRRRRRRRRRR');

      let values = [queryArray[j][0], queryArray[j][1], bookmarkId];

      try {
          console.log('RUNNING THIS SHIET!');
          let res = await db.query(queryString, values);
          result.push(res);
      } catch (error) {
          console.log('ERROR: ', error);
          err.push(error);
      }
    }

    callback(err, result);

  }



  return {
    createLink
  }
}
