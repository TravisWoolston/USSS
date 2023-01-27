if (require.main === module) {
	throw new Error('Do not run directly. Use server.js to start.');
}

const Koa = require('koa');
const koaStatic = require('koa-static');
const cors = require('cors')

const indexApp = new Koa();


// Register Routes
let indexRouter = require('./routerIndex');

indexApp.use(indexRouter.routes(), cors(
  { credentials: true, origin: "http://localhost:5000" 
}))
  .use(indexRouter.allowedMethods());


indexApp.use(koaStatic('./public'));


module.exports = indexApp;