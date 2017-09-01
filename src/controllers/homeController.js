import moment from 'moment';

import config from '../config';

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function preparePost
 * @private
 * @param {Object} post Post to be prepared
 * @return {Object} Post to be prepared
 * @description Prepare a post to be rendered
 */
const preparePost = function preparePost(post) {
  const p = Object.assign({}, post);

  p.createdAt = moment(p.createdAt).format(config.app.dateFormat);
  p.updatedAt = moment(p.updatedAt).format(config.app.dateFormat);
  p.excerpt = `${p.body.substr(0, 256)}...`;

  return p;
};

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function show`
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
exports.home = function show(req, res) {
  // Get posts
  req.services.postProvider.getPosts(
    req.query.page, config.posts.limitPerPage,
    req.services.postProvider.FULL_BODY,
  )
    .then((postResponse) => {
      res.render(
        'home',
        {
          title: 'Home',
          pagination: postResponse.pagination,
          posts: postResponse.data.map(preparePost),
        },
      );
    })
    .catch(error => console.log(error));
};
