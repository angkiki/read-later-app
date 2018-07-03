module.exports = function(app, db) {
  const user = require('./controllers/users.js')(db);
  const bookmark = require('./controllers/bookmarks.js')(db);

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
  app.get('/bookmarks/get', bookmark.bookmarkGet);

  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  //          LINKS
  // ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
  // app.get('/links', link.linkIndex);
}
