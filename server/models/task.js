'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      belongsTo(models.User, {
        foreignKey: 'assignee_id',
        onDelete: 'CASCADE',  
      })
    }
  };
  Task.init({
    title: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    assignee_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};