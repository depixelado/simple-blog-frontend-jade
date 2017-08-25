import moment from 'moment';

import config from '../config';
import postProvider from '../providers/post';

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
exports.show = function show(req, res) {
  // Get posts
  postProvider.getPost(req.params.postId)
    .then((post) => {
      res.render(
        'posts/single',
        {
          post: preparePost(post),
        },
      );
    })
    .catch(error => console.log(error));
};
