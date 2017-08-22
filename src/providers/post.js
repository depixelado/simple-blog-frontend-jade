import blogRequester from '../services/blog-requester';

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

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function getPost
 * @public 
 * @param {String} postId post Id
 * @return {Promise}
 * @description Get post by Id from API  
 */
exports.getPost = function getPost(postId) {
  return blogRequester({
    endPoint: `/posts/${postId}`,
  });
};

