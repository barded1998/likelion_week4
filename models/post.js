// const Sequelize = require('sequelize');
import { Sequelize } from 'sequelize';
export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'post',
        tableName: 'posts',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User, {
      foriegnKey: 'userId',
      targetKey: 'id',
    });
  }
}
