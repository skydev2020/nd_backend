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
      this.belongsTo(models.User, {
        foreignKey: 'assignee_id',
        onDelete: 'SET NULL',
        as: 'assignee'
      })
      this.belongsTo(models.Project, {
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
        as: 'project'
      })
    }
  };
  Task.init({
    title: DataTypes.STRING,    
    assignee_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};