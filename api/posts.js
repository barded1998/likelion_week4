import express from 'express';

let nextId = 4; // posts 변수에 id를 설정합니다

let posts = [
	// posts 배열
	{
		// posts[0]
		id: 1,
		title: 'Avengers',
	},
	{
		// posts [1]
		id: 2,
		title: 'Spider-man',
	},
	{
		// posts [2]
		id: 3,
		title: 'Harry Potter',
	},
];

const router = express.Router();

//GET /api/posts - 글 목록 조회
router.get('/', (req, res) => {
	return res.status(200).json(posts);
});

//GET /api/posts/:postId - 글 개별 항목 조회
router.get('/:postId', (req, res) => {
	const postId = parseInt(req.params.postId);
	const post = posts.find((post) => post.id === postId);
	if (post) {
		return res.status(200).json(post);
	}
	return res.sendStatus(404);
});

// POST /api/posts - 글 생성
router.post('/', (req, res) => {
	const title = req.body.title;
	const post = { id: nextId++, title };
	posts = [...posts, post];
	return res.status(201).json(post);
});

// PUT /api/posts/:postId - 특정 글 수정
router.put('/:postId', (req, res) => {
	const postId = parseInt(req.params.postId);
	const title = req.body.title;
	const post = posts.find((p) => p.id === postId);
	if (post) {
		post.title = title;
		return res.status(200).json(post);
	}
	return res.sendStatus(404);
});

// DELETE /api/posts/:postId - 특정 글 삭제
router.delete('/:postId', (req, res) => {
	const postId = parseInt(req.params.postId);
	posts = posts.filter((p) => p.id !== postId);
	return res.sendStatus(204);
});

export default router;
