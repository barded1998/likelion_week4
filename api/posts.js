import express from 'express';
import cors from 'cors';
import * as postRepository from '../db/post.js';
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:4000',
};

//GET /api/posts - 글 목록 조회
router.get('/', async (req, res) => {
  return res
    .header('Access-Control-Allow-Origin', 'http://localhost:4000')
    .status(200)
    .json({ data: await postRepository.getAll() });
});

//GET /api/posts/:postId - 특정 글 조회
router.get('/:postId', cors(corsOptions), async (req, res) => {
  const postId = req.params.postId;
  const post = await postRepository.getByPostId(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post does not exist' });
  }
  return res.status(200).json({ data: post });
});

// POST /api/posts - 글 생성
router.post('/', cors(corsOptions), async (req, res) => {
  const userId = req.decoded.id;
  const content = req.body.content;
  const post = await postRepository.create(content, userId);
  return res.status(201).json({ data: { post: { id: post.id } } });
});

// PUT /api/posts/:postId - 특정 글 수정
router.put('/:postId', cors(corsOptions), async (req, res) => {
  const userId = req.decoded.id;
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
router.delete('/:postId', cors(corsOptions), async (req, res) => {
  const userId = req.decoded.id;
  const postId = req.params.postId;
  const post = await postRepository.getByPostId(postId);
  if (!post) {
    return res.status(404).json({ error: 'Cannot find post' });
  }
  if (userId != post.userId) {
    return res.status(403).json({ error: 'Cannot delete post' });
  }
  await postRepository.remove(post.id);
  return res.status(200).json({ data: 'Successfully deleted' });
});

export default router;
