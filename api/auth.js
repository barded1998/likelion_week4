import express from 'express';
import * as userRepository from '../db/user.js';

const router = express.Router();

// POST /api/auth/login - 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository.getByEmail(email);
  if (!user) {
    return res.status(404).json({ error: 'User not exist' });
  }
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  return res.status(200).json({ data: { user: { id: user.id } } });
});

// POST /api/auth/register - 회원가입
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await userRepository.getByEmail(email);
  if (foundUser) {
    return res.status(401).json({ error: 'User already exist' });
  }

  return res.status(201).json({
    data: { user: { id: (await userRepository.create(email, password)).id } },
  });
});

export default router;
