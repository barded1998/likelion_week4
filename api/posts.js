import express from 'express';
import * as postRepository from '../db/post.js';

const router = express.Router();

//GET /api/posts - 글 목록 조회
router.get('/', async (req, res) => {
  return res.status(200).json({ data: await postRepository.getAll() });
});

//GET /api/posts/:postId - 특정 글 조회
router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const post = await postRepository.getByPostId(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post does not exist' });
  }
  return res.status(200).json({ data: post });
});

// POST /api/posts - 글 생성
router.post('/', async (req, res) => {
  const userId = req.headers['x-user-id'];
  const content = req.body.content;
  const post = await postRepository.create(content, userId);
  return res.status(201).json({ data: { post: { id: post.id } } });
});

// PUT /api/posts/:postId - 특정 글 수정
router.put('/:postId', async (req, res) => {
  const userId = req.headers['x-user-id'];
  const postId = req.params.postId;
  const content = req.body.content;
  const post = await postRepository.getByPostId(postId);
  if (!post) {
    return res.status(404).json({ error: 'Cannot find post' });
  }
  if (userId != post.userId) {
    return res.status(403).json({ error: 'Cannot modify post' });
  }
  await postRepository.update(post.id, content);
  return res.status(200).json({ data: { id: post.id } });
});

// DELETE /api/posts/:postId - 특정 글 삭제
router.delete('/:postId', async (req, res) => {
  const userId = req.headers['x-user-id'];
  const postId = req.params.postId;
  const post = await postRepository.getByPostId(postId);
  if (!post) {
    return res.status(404).json({ error: 'Cannot find post' });
  }
  if (userId != post.userId) {
    return res.status(403).json({ error: 'Cannot delete post' });
  }
  postRepository.remove(post.id);
  return res.status(200).json({ data: 'Successfully deleted' });
});

export default router;
