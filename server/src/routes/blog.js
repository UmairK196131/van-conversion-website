import { Router } from 'express';
import { getBlogPostBySlug, listBlogPosts } from '../controllers/blogController.js';

const router = Router();

router.get('/', listBlogPosts);
router.get('/:slug', getBlogPostBySlug);

export default router;
