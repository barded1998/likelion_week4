import express from 'express';
import * as userRepository from '../db/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// POST /api/auth/login - 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository.getByEmail(email);
  if (!user) {
    return res.status(404).json({ error: 'User not exist' });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '10m',
    issuer: 'JWT_study',
  });
  return res.status(200).json({ data: { user: { id: user.id } }, token });
});

// POST /api/auth/register - 회원가입
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await userRepository.getByEmail(email);
  if (foundUser) {
    return res.status(401).json({ error: 'User already exist' });
  }
  const hashed = await bcrypt.hash(password, 10);
  return res.status(201).json({
    data: { user: { id: (await userRepository.create(email, hashed)).id } },
  });
});

export default router;
