/**
 * 403 unauthorized rejection return, ends response
 *
 * @param {Object} res
 */
module.exports = function(res) {
  res.status(403);
  res.write('unauthorized');
  res.end();
};
