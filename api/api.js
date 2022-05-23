import express from 'express';
import posts from './posts.js';
import auth from './auth.js';
const api = express.Router();

api.use('/posts', posts);
api.use('/auth', auth);

export default api;
