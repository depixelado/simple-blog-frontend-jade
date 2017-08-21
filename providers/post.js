const blogRequester = require('../services/blog-requester');

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function getPosts
 * @public 
 * @param {Number} page Post list page
 * @param {Number} limit limit of post per page
 * @return {Promise}
 * @description Get posts from API  
 */
exports.getPosts = function getPosts(page = 1, limit = 10) {
  return blogRequester({
    endPoint: '/posts',
    options: {
      qs: {
        page,
        limit,
      },
    },
  });
};
