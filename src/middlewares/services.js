import blogRequester from '../services/blog-requester';
import postProvider from '../providers/post';
import userProvider from '../providers/user';

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @public
 * @function services
 * @param {any} req HTTP Request
 * @param {any} res HTTP Response
 * @param {any} next Function to pass to the next middleware
 * @description Provide services. Functions available trough request
 */
module.exports = function services(req, res, next) {
  req.services = {};
  const serv = req.services;
  const blogRequester = blogRequester(req.session.user._id, req.session.user.password);

  serv.postProvider = postProvider(blogRequester);
  serv.userProvider = userProvider(blogRequester);

  next();
};
