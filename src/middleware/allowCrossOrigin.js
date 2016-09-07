function allowCrossOrigin(req, res, next) {
  let method = req.method && req.method.toUpperCase && req.method.toUpperCase();

  if (method === 'OPTIONS') {
    // Access-Control-Allow-Origin
    res.header('Access-Control-Allow-Origin', '*');
    // Access-Control-Allow-Methods
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    // Access-Control-Allow-Headers
    res.header('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Access-Control-Allow-Headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Access-Control-Max-Age
    res.header('Access-Control-Max-Age', '86400');

    res.statusCode = 204;
    res.end();
  } else {
    // Access-Control-Allow-Origin
    res.header('Access-Control-Allow-Origin', '*');
    // Access-Control-Expose-Headers
    res.header('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  }
}

module.exports = allowCrossOrigin;
