import express from 'express';

let users = [];
let userId = 1;

const router = express.Router();

// POST /api/auth/login - 로그인
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ error: 'User not exist' });
  }
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  return res.status(200).json({ data: { user: user.id } });
});

// POST /api/auth/register - 회원가입
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const foundUser = users.find((u) => u.email === email);
  if (foundUser) {
    return res.status(401).json({ error: 'User already exist' });
  }
  const user = { id: (userId++).toString(), email, password };
  users = [...users, user];
  return res.status(201).json({ data: { user: { id: user.id } } });
});

export default router;
