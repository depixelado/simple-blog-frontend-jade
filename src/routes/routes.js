import express from 'express';
import homeController from '../controllers/homeController';
import postController from '../controllers/postController';

const router = express.Router();

/** Favicon */
router.use('/favicon.ico', (req, res) => res.end());

/** Posts */
router.use('/posts/:postId', postController.show);

/* Home */
router.use('/', homeController.home);

module.exports = router;
