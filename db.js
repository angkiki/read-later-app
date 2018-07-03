const pg = require('pg');

const configs = {
  user: 'angkiki',
  host: '127.0.0.1',
  database: 'project_2',
  port: 5432
};

const poolObj = new pg.Pool(configs);

poolObj.on('error', function (err) {
   console.log('idle client error', err.message, err.stack);
 });

 const userModel = require('./models/user');
 const bookmarkModel = require('./models/bookmark');
 const userObj = userModel(poolObj);
 const bookmarkObj = bookmarkModel(poolObj);

 module.exports = {
   user: userObj,
   bookmark: bookmarkObj,
   pool: poolObj
 };
