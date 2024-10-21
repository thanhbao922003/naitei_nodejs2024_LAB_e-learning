import { Router } from 'express';
import * as commentController from '../controller/comment.controller';
import { isAdmin } from 'src/middleware/roleCheckMiddleware'

const router: Router = Router();

// Public access: Get the list of comments
router.get('/', commentController.commentList);

// Admin only: Delete a comment
router.post('/:id/delete', isAdmin, commentController.commentDeletePost);

export default router;