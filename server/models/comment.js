'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'created_by',
        onDelete: 'SET NULL',
        as: 'user'
      });

      this.belongsTo(models.Task, {
        foreignKey: 'task_id',
        onDelete: 'CASCADE',
        as: 'task'
      });
      
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};