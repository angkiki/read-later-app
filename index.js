const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cheerio = require('cheerio');
const request = require('request');
const db = require('./db');
const myRoutes = require('./routes.js');

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

// request(url, (error, response, body) => {
//   let $ = cheerio.load(body);
//   let links = $('a');
// })

/*
    =========================================================================================================
    =========================================================================================================
                           ~ ~ ~ listening to the port ~ ~ ~
    =========================================================================================================
    =========================================================================================================
*/

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');
  // close database connection pool
  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
