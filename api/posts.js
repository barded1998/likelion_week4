import express from 'express';

let posts = [];

const router = express.Router();

//GET /api/posts - 글 목록 조회
router.get('/', (req, res) => {
	const postId = parseInt(req.body.id);
	if (postId) {
		const post = posts.find((p) => p.id === postId);
		if (!post) {
			return res.status(404).json({ error: 'Post does not exist' });
		}
		return res.status(200).json({ data: post });
	}
	return res.status(200).json({ data: posts });
});

// POST /api/posts - 글 생성
router.post('/', (req, res) => {
	const postId = parseInt(req.body.id);
	const content = req.body.content;
	const post = { id: postId, content, userId: 1 };
	posts = [...posts, post];
	return res.status(201).json({ data: { post: { id: postId } } });
});

// PUT /api/posts - 특정 글 수정
router.put('/', (req, res) => {
	const userId = parseInt(req.body.userId);
	const content = req.body.content;
	const postId = parseInt(req.body.postId);
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

// DELETE /api/posts - 특정 글 삭제
router.delete('/', (req, res) => {
	const userId = parseInt(req.body.userId);
	const postId = parseInt(req.body.postId);
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
