const pg = require('pg');
const url = require('url');

if( process.env.DATABASE_URL ){

  //we need to take apart the url so we can set the appropriate configs

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

} else {
    const configs = {
      user: 'angkiki',
      host: '127.0.0.1',
      database: 'project_2',
      port: 5432
    };
}


const poolObj = new pg.Pool(configs);

poolObj.on('error', function (err) {
   console.log('idle client error', err.message, err.stack);
 });

 const userModel = require('./models/user');
 const bookmarkModel = require('./models/bookmark');
const linkModel = require('./models/link');

 const userObj = userModel(poolObj);
 const bookmarkObj = bookmarkModel(poolObj);
 const linkObj = linkModel(poolObj);

 module.exports = {
   user: userObj,
   bookmark: bookmarkObj,
   link: linkObj,
   pool: poolObj
 };
