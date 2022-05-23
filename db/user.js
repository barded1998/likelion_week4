import User from '../models/user.js';

export async function getByUserId(userId) {
  return User.findOne({ where: { id: userId } });
}

export async function getByEmail(email) {
  return await User.findOne({ where: { email } });
}

export async function create(email, password) {
  const user = await User.create({ email, password });
  return user;
}
