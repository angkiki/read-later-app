module.exports = function(app, db) {
  const user = require('./controllers/users.js')(db);
  const bookmark = require('./controllers/bookmarks.js')(db);
  const link = require('./controllers/links.js')(db);

  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  //          USER
  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  app.get('/users/new', user.newUser);
  app.post('/users/new', user.createUser);
  app.get('/users/login', user.newUserSession);
  app.post('/users/login', user.createUserSession);
  app.get('/users/logout', user.destroyUserSession);

  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  //          BOOKMARK
  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  app.get('/bookmarks', bookmark.bookmarkIndex);
  app.get('/bookmarks/new', bookmark.bookmarkNew);
  app.post('/bookmarks/new', bookmark.bookmarkCreate);
  app.get('/bookmarks/:id', bookmark.bookmarkShow);

  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  //          LINKS
  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  app.get('/links/:id/new', link.newLink);
  app.post('/links/:id/new', link.createLink);
  app.delete('/links/:id/delete', link.deleteLink);

  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  //          AJAX
  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  app.post('/users/login/ajax', user.newAjaxUser);
  app.post('/links/new/ajax', link.ajaxNewLink)
}
