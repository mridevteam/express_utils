[![Build Status](https://travis-ci.org/mridevteam/express_utils.svg?branch=master)](https://travis-ci.org/mridevteam/express_utils)

# express_utils
A library of commonly used express.js functions as created and used by the MRI Dev Team


### Core Functions

#### RouteLoader
The routeLoader provides a directory based approach to registering API endpoints in an express application.  To add additional endpoints simply add a new router file to your defined "routes" directory.
Then the routeLoader will dynamically register all route files on application startup.

Usage:

```
const routeLoader = require('express_utils').routeLoader
    , ROUTEPREFIX = '/'  //this could be any url root you want your application's routes to be pathed behind
    ;

let app = express();

routeLoader.load(app, path.join(__dirname, 'app/routes'), ROUTEPREFIX);

```
the Routeloader will register all files in the supplied directory to a endpoint based on the name of the file itself.  Take the following example:

// app/routes/test.js
```
'use strict';

let testRouter = require('express').Router()
  ;

module.exports = testRouter;

// /test route
testRouter.get('/', function(req, res, next) {
  res.status(200);
  res.end();
});

// /test/error route
testRouter.get('/error', function(req, res, next) {
  res.status(500);
  res.end();
})
```

With this example, uses the routeloader two endpoints would be created for the application:
> /test
> /test/error


Remember the RouteLoader uses the *Name of the file* to create pathing.  For a working example take a look at the unit test for the routeloader in this project.


#### bootExpressServer.js
The bootExpressServer provides a standard way to start express.js applications.  It handles process termination events (SIGTERM/SIGINT) as well as normalizing of the provided port


Usage:
```
const bootExpressServer = require('express_utils).bootExpressServer'
    , PORT = process.env.PORT || 3000
    , TIMEOUT = 100000
    ;

var app = express();


// ... setup express app

bootExpressServer(app, PORT, TIMEOUT);
```


### Middleware

#### Error Handling
express_utils provides so generic error handling middleware functions to be re-used in most express.js applications.

##### 404

Send 404 status for API calls
```
var app = express()
  , errorware = require('express_utils').middleware.error
  ;


// ... setup express app, register routes, etc..

// anything that has fallen through here is a 404
app.all('*', errorware[404]);
```

Render a 404 view for HTML calls
```
var app = express()
  , errorware = require('express_utils').middleware.error
   ;


// ... setup express app, register routes, etc..

// anything that has fallen through here is a 404
app.all('*', errorware['404Client']('my404ViewName');
```
404Client calls "res.render(<supplied view name>)"


##### 500

Send 500 status for API calls
```
var app = express()
  , errorware = require('express_utils').middleware.error
  ;


// ... setup express app, register routes, etc..

// anything that has fallen through here and has an error object passed to express "next()" function
app.all('*', errorware[500]);
```

Render a 500 view for HTML calls
```
var app = express()
  , errorware = require('express_utils').middleware.error
   ;


// ... setup express app, register routes, etc..

// anything that has fallen through here is a 404
app.all('*', errorware['404Client']('my404ViewName');
```
404Client calls "res.render(<supplied view name>)"