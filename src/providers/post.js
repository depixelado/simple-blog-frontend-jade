import blogRequester from '../services/blog-requester';

/**
 * @var FULL_BODY Make getters return the whole body response insted of the data property
 */
exports.FULL_BODY = true;

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function getPosts
 * @public 
 * @param {Number} page Post list page
 * @param {Number} limit limit of post per page
 * @return {Promise}
 * @description Get posts from API  
 */
exports.getPosts = function getPosts(page = 1, limit = 10, fullBody = false) {
  const postPromise = blogRequester({
    endPoint: '/posts',
    options: {
      qs: {
        page,
        limit,
      },
    },
  });

  if (fullBody === true) return postPromise;

  return postPromise
    .then(res => res.data);
};

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function getPost
 * @public 
 * @param {String} postId post Id
 * @return {Promise}
 * @description Get post by Id from API  
 */
exports.getPost = function getPost(postId, fullBody) {
  const postPromise = blogRequester({
    endPoint: `/posts/${postId}`,
  });

  if (fullBody === true) return postPromise;

  return postPromise
    .then(res => res.data);
};

