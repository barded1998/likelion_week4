import express from 'express';
import posts from './posts.js';

const api = express.Router();

api.use('/posts', posts);

export default api;
