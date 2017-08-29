import express from 'express';
import homeController from '../controllers/homeController';
import postController from '../controllers/postController';

const router = express.Router();

/** Favicon */
router.use('/favicon.ico', (req, res) => res.end());

/** Posts */
router.get('/posts/:postId', postController.show);
router.post('/posts/:postId/comment', postController.storeComment);

/* Home */
router.use('/', homeController.home);

module.exports = router;
