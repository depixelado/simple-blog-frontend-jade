import express from 'express';
import homeController from '../controllers/homeController';
import postController from '../controllers/postController';
import userController from '../controllers/userController';

const router = express.Router();

/** Favicon */
router.use('/favicon.ico', (req, res) => res.end());

/** Posts */
router.get('/posts/create', postController.create);
router.get('/posts/:postId', postController.show);

router.post('/posts', postController.store);
router.post('/posts/:postId/comment', postController.storeComment);

/** Users */
router.get('/users/:userId', userController.show);

/* Home */
router.use('/', homeController.home);

module.exports = router;
