const sha256 = require('js-sha256');
const SALT = 'Angkiki is VERY Handsome';
const REQUEST = require('request');
const cheerio = require('cheerio');
const querystring = require('querystring');

module.exports = function(db) {

  const newLink = (request, response) => {
    // authenticate user
    let userId = request.cookies['userId'];
    let userSessionId = request.cookies['sessionId'];
    let ourSessionId = sha256(userId + SALT);

    if (userId == undefined || userSessionId != ourSessionId) {
        // user not authenticated
        const props = querystring.stringify({
          flash: 'danger',
          message: 'Unauthorised Access'
        })
        response.redirect('/?' + props);
    } else {
        let bookmarksId = request.params.id;
        let url = request.query.url;
        let protocol = url.slice(0,4);

        if (protocol !== 'http') {
          url = 'https://' + url;
        }

        REQUEST(url, (error, res, body) => {
          var $ = cheerio.load(body);
          var links = $('a');
          const linkArray = [];

          for (let i = 0; i < links.length; i++) {
            let url = links[i].attribs.href;
            let protocol = url.slice(0,4);

            if (links[i].children && links[i].children[0].data !== undefined && protocol === 'http') {
              linkArray.push(links[i]);
            }
          };

          const props = {
            page: 'links',
            subpage: 'new',
            bookmarksId: bookmarksId,
            userId: userId,
            links: linkArray
          }

          response.render('application', props)
        })
    }
  }

  const createLink = (request, response) => {
    // returns single '0' if link was unchecked
    // returns array of ['1', '0'] if link was checked
    let checkBoxArray = request.body.link;
    let titleArray = request.body.data;
    let urlArray = request.body.url;
    let bookmarkId = request.params.id;

    db.link.createLink(bookmarkId, checkBoxArray, titleArray, urlArray, (err, result) => {
      if (err && err.length > 0) {
          const props = querystring.stringify({
            flash: 'warning',
            message: err.length + ' Links Failed To Save'
          })
          response.redirect('/bookmarks?' + props);
      } else {
          const props = querystring.stringify({
            flash: 'success',
            message: 'Links Successfully Saved!'
          })
          response.redirect('/bookmarks?' + props);
      }
    })
  }

  const deleteLink = (request, response) => {
    let linkId = request.params.id;
    db.link.deleteLink(linkId, (err, result) => {
      if (err) {
          console.log('ERROR: ', err);
          const props = querystring.stringify({
            flash: 'danger',
            message: 'Oops! Failed to Delete Link'
          })
          response.redirect('/bookmarks?' + props);
      } else {
          let bookmarkId = result.rows[0].bookmark_id;

          const props = querystring.stringify({
            flash: 'success',
            message: 'Link Deleted!'
          })

          response.redirect('/bookmarks/' + bookmarkId + '/?' + props);
      }
    })
  }

  const ajaxNewLink = (request, response) => {
    let username = request.query.username;
    let url = request.query.url;

    REQUEST(url, (error, res, body) => {

      if (error) {
          const responseObject = {
            error: 'Failed To Get URL'
          }
          response.send(responseObject);
      } else {
          var $ = cheerio.load(body);
          var links = $('a');
          const linkArray = [];

          for (let i = 0; i < links.length; i++) {
            let url = links[i].attribs.href;
            let protocol = url.slice(0,4);
            let children = links[i].children;

            if (children && children[0].data !== undefined && children[0].data != '' && protocol === 'http') {
              linkArray.push([ children[0].data, url ]);
            }
          };

          db.link.createAjaxLink(username, url, linkArray, (err, result) => {
            if (err > 0) {
                const responseObject = {
                  error: 'Failed to save ' + err + ' URLs'
                }
                response.send(responseObject);
            } else {
                const responseObject = {
                  success: true
                }
                response.send(responseObject);
            }
          })
      }

    })
  }

  const searchLinks = (request, response) => {
    // authenticate user first
    let userId = request.cookies['userId'];
    let userSessionId = request.cookies['sessionId'];
    let ourSessionId = sha256(userId + SALT);

    if (userId == undefined || userSessionId != ourSessionId) {
        // user not authenticated
        const props = querystring.stringify({
          flash: 'danger',
          message: 'Unauthorised Access'
        })
        response.redirect('/?' + props);
    } else {
        let queryParam = request.query.query;
        db.link.searchLink(queryParam, userId, (err, result) => {
          if (err) {
              const props = querystring.stringify({
                flash: 'danger',
                message: 'Oops! Failed to Delete Link'
              })
              response.redirect('/bookmarks?' + props);
          } else {
              const props = {
                userId: userId,
                page: 'links',
                subpage: 'search',
                links: result
              }
              response.render('application', props);
          }
        })
    }
  }

  return {
    newLink,
    createLink,
    deleteLink,
    ajaxNewLink,
    searchLinks
  }
}
