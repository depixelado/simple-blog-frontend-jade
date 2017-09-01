/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @public
 * @function templateGlobals
 * @param {any} req HTTP Request
 * @param {any} res HTTP Response
 * @param {any} next Function to pass to the next middleware
 */
module.exports = function templateGlobals(req, res, next) {
  // Expose session to the template system
  res.locals.session = req.session;

  next();
};
