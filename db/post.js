import Post from '../models/post.js';

export async function getAll() {
  return Post.findAll({});
}

export async function getByPostId(postId) {
  return await Post.findOne({ where: { id: postId } });
}

export async function create(content, userId) {
  return await Post.create({ content, userId });
}

export async function update(id, content) {
  return await Post.update({ content }, { where: { id } });
}

export async function remove(id) {
  await Post.destroy({ where: { id } });
}
