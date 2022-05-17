import express from 'express';

let posts = [];
let postId = 1;

const router = express.Router();

//GET /api/posts - 글 목록 조회
router.get('/', (req, res) => {
  return res.status(200).json({ data: posts });
});

//GET /api/posts/:postId - 특정 글 수정
router.get('/:postId', (req, res) => {
  const postId = req.params.postId;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Post does not exist' });
  }
  return res.status(200).json({ data: post });
});

// POST /api/posts - 글 생성
router.post('/', (req, res) => {
  const userId = req.headers['x-user-id'];
  const content = req.body.content;
  const post = { id: (postId++).toString(), content, userId };
  posts = [...posts, post];
  return res.status(201).json({ data: { post: { id: post.id } } });
});

// PUT /api/posts/:postId - 특정 글 수정
router.put('/:postId', (req, res) => {
  const userId = req.headers['x-user-id'];
  const postId = req.params.postId;
  const content = req.body.content;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Cannot find post' });
  }
  if (userId !== post.userId) {
    return res.status(403).json({ error: 'Cannot modify post' });
  }
  post.content = content;
  return res.status(200).json({ data: { id: post.id } });
});

// DELETE /api/posts/:postId - 특정 글 삭제
router.delete('/:postId', (req, res) => {
  const userId = req.headers['x-user-id'];
  const postId = req.params.postId;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Cannot find post' });
  }
  if (userId !== post.userId) {
    return res.status(403).json({ error: 'Cannot delete post' });
  }
  posts = posts.filter((p) => p.id !== postId);
  return res.status(200).json({ data: 'Successfully deleted' });
});

export default router;
