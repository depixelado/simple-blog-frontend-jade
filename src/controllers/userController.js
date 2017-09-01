import moment from 'moment';

import config from '../config';
import userProvider from '../providers/user';

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function prepareDates
 * @private
 * @param {Object} resource Resource to be prepared
 * @return {Object} Resource with transformed dates
 * @description Prepare recource dates
 */
const prepareDates = function prepareDates(resource) {
  return Object.assign(
    {},
    resource,

    // Give proper format to dates
    {
      createdAt: moment(resource.createdAt).format(config.app.dateFormat),
      updatedAt: moment(resource.updatedAt).format(config.app.dateFormat),
    },
  );
};

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function show
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
exports.show = function show(req, res) {
  // Get posts
  userProvider.getUser(req.params.userId)
    .then((user) => {
      res.render(
        'users/single',
        {
          user: prepareDates(user),
        },
      );
    })
    .catch(error => console.log(error));
};

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function login
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @description Serves login form page
 */
exports.login = function login(req, res) {
  res.render('login');
};

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function authenticate
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @description Authenticate users against API
 */
exports.authenticate = function authenticate(req, res) {
  const {
    username,
    password,
  } = req.body;

  userProvider.auth(username, password)
    .then((user) => {
      req.session.user = user;
      res.redirect('/');
    })
    .catch(() => res.redirect('/login?error=true'));
};
