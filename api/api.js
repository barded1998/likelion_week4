import express from 'express';
import posts from './posts.js';
import auth from './auth.js';
import verifyToken from '../middleware/verfiyToken.js';
const api = express.Router();

api.use('/posts', verifyToken, posts);
api.use('/auth', auth);

export default api;
