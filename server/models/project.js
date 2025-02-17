'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Task, {
        foreignKey: 'project_id',
        as: 'tasks',
      });
    }
  };
  Project.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};