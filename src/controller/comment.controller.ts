import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllComments, findCommentById, deleteComment } from '../service/comment.service';

export const commentList = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const comments = await getAllComments()
  res.json(comments);
});

export const commentDeletePost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const comment = await findCommentById(parseInt(req.params.id))

  if (!comment) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }

  await deleteComment(comment)
  res.status(204).send(); 
});