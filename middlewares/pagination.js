const sanatize = require('../utils/sanatize');

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @public
 * @function pagination
 * @param {any} req HTTP Request
 * @param {any} res HTTP Response
 * @param {any} next Function to pass to the next middleware
 */
module.exports = function pagination(req, res, next) {
  req.query.page = sanatize.pageNumber(req.query.page);
  next();
};
