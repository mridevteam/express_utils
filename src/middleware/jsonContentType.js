/**
 * Sets the response content-type to application/json
 *
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
function setJsonContentType(req, res, next) {
  res.set('Content-Type', 'application/json');

  next();
}

module.exports = setJsonContentType;
