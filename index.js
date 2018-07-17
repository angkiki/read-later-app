const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cheerio = require('cheerio');
const request = require('request');
const db = require('./db');
const myRoutes = require('./routes.js');
const PORT = process.env.PORT || 3000;

/*
    =========================================================================================================
    =========================================================================================================
                           start of boiler plate stuff (setting up of express/react)
                           npm install express-react-views react react-dom
    =========================================================================================================
    =========================================================================================================
*/

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
app.use(express.static(__dirname + '/public'));


/*
    =========================================================================================================
    =========================================================================================================
                           start of routes
    =========================================================================================================
    =========================================================================================================
*/

app.get('/', (request, response) => {
  let userId = request.cookies['userId'];
  let flash = request.query.flash;
  let message = request.query.message;

  const props = {
    userId: userId,
    page: 'home',
    flash: flash,
    message: message
  }
  response.render('application', props);
});

myRoutes(app, db);

// update the db with a one off function
module.exports.updateLinksTable = function() {
  const queryString = "SELECT * FROM links";
  db.pool.query(queryString, (err, result) => {
    console.log('DONE WITH FIRST QUERY')
    let linksArray = result.rows;
    for (let i = 0; i < linksArray.length; i++) {
      console.log('RUNNING INSERT NUMBER: ' + i);
      let values = [linksArray[i].id, linksArray[i].description + " - " + linksArray[i].url];
      let insertQueryString = 'UPDATE links SET search = $2 WHERE id = $1';
      db.pool.query(insertQueryString, values, (error, iResult) => {
        if (error) {
          console.log('INSERT ERROR: ', error);
        } else {
          console.log('INSERT SUCCESS NO: ' + i);
        }
      });
    }
  })
}

/*
    =========================================================================================================
    =========================================================================================================
                           ~ ~ ~ listening to the port ~ ~ ~
    =========================================================================================================
    =========================================================================================================
*/

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');
  // close database connection pool
  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
