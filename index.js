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


/*
    =========================================================================================================
    =========================================================================================================
                           start of routes
    =========================================================================================================
    =========================================================================================================
*/

app.get('/', (req, res) => {
  // const url = "https://medium.com/productivity-freak/my-atom-editor-setup-for-js-react-9726cd69ad20"
  // request(url, (error, response, body) => {
  //   var $ = cheerio.load(body);
  //   var links = $('a');
  //   for (let i = 0; i < links.length; i++) {
  //     console.log(links[i].children[0].data + ': ' + links[i].attribs.href);
  //   }
  // })
  let userId = req.cookies['userId'];
  const props = {
    userId: userId,
    page: 'home'
  }

  res.render('application', props);
});

myRoutes(app, db);

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
