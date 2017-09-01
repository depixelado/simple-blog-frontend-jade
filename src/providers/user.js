module.exports = function userProvider(blogRequester) {
  return {
    /**
     * @var FULL_BODY Make getters return the whole body response insted of the data property
     */
    FULL_BODY: true,

    getResourceFromResponse: function getResourceFromResponse(
      resourcePromise,
      fullBody,
    ) {
      if (fullBody === true) return resourcePromise;

      return resourcePromise
        .then(res => res.data);
    },

    /**
     * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
     * @function getUser
     * @public 
     * @param {String} postId post Id
     * @return {Promise}
     * @description Get post by Id from API  
     */
    getUser: function getUser(userId, fullBody) {
      const postPromise = blogRequester({
        endPoint: `/users/${userId}`,
      });

      return this.getResourceFromResponse(postPromise, fullBody);
    },

    /**
     * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
     * @function auth
     * @public 
     * @param {String} postId post Id
     * @return {Promise}
     * @description Get post by Id from API  
     */
    auth: function auth(username, password) {
      const authHash = new Buffer(`${username}:${password}`).toString('base64');
      const authHeader = `Basic ${authHash}`;

      return blogRequester({
        endPoint: '/users/me',
        options: {
          headers: {
            Authorization: authHeader,
          },
        },
      })
        // Succesful authorization
        .then(response => response.data)
        // Unsuccesful authorization
        .catch(() => Promise.reject(false));
    },
  };
};

