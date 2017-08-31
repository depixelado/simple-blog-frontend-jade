import moment from 'moment';

import config from '../config';
import postProvider from '../providers/post';
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
 * @function preparePost
 * @private
 * @param {Object} post Post to be prepared
 * @return {Object} Post to be prepared
 * @description Prepare a post to be rendered
 */
const preparePost = function preparePost(post) {
  return Object.assign(
    {},
    // Preare dates
    prepareDates(post),

    // Generate excerpt
    {
      excerpt: `${post.body.substr(0, 256)}...`,
    },

    // Prepare comment dates
    {
      comments: post.comments.map(comment => prepareDates(comment)),
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
  const postPromise = postProvider.getPost(req.params.postId)
    .catch(error => console.log(error));

  const userPromise = postPromise
    .then(post => userProvider.getUser(post.userId));

  Promise.all([
    postPromise,
    userPromise,
  ])
    .then(([post, user]) => {
      res.render(
        'posts/single',
        {
          post: preparePost(post),
          user: prepareDates(user),
        },
      );
    })
    .catch(error => console.log(error));
};

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function create
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
exports.create = function create(req, res) {
  res.render(
    'posts/create',
  );
};

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function store
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
exports.store = function store(req, res) {
  postProvider.storePost(
    {
      title: req.body.title,
      body: req.body.body,
    },
  )
    .then(post => res.redirect(301, `/posts/${post._id}`))
    .catch(() => res.redirect(400, '/posts'));
};

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function show
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
exports.storeComment = function storeComment(req, res) {
  const postId = req.params.postId;
  const commentBody = req.body.body;

  postProvider.storeComment(
    postId,
    {
      body: commentBody,
    },
  )
    .then(() => res.redirect(301, `/posts/${postId}?storeComment=success`))
    .catch(() => res.redirect(400, `/posts/${postId}?storeComment=error`));
};
