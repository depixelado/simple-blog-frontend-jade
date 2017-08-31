import blogRequester from '../services/blog-requester';

/**
 * @var FULL_BODY Make getters return the whole body response insted of the data property
 */
exports.FULL_BODY = true;

const getResourceFromResponse = function getResourceFromResponse(
  resourcePromise,
  fullBody,
) {
  if (fullBody === true) return resourcePromise;

  return resourcePromise
    .then(res => res.data);
};

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function getUser
 * @public 
 * @param {String} postId post Id
 * @return {Promise}
 * @description Get post by Id from API  
 */
exports.getUser = function getUser(userId, fullBody) {
  const postPromise = blogRequester({
    endPoint: `/users/${userId}`,
  });

  return getResourceFromResponse(postPromise, fullBody);
};
