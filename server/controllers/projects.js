const Project = require('../models').Project;
const Task = require('../models').Task;

module.exports = {
  create(req, res) {
    return Project
      .create({
        title: req.body.title,
      })
      .then((project) => res.status(201).send(project))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Project
      .findAll({
        include: [{
          model: Task,
          as: 'tasks',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Task, as: 'tasks' }, 'createdAt', 'ASC'],
        ],
      })
      .then((projects) => res.status(200).send(projects))
      .catch((error) => res.status(400).send(error));    
  },

  //Add Task
  addTask(req, res) {
    return Project
      .find({
        where: {
          id: req.params.id,
        },
      })
      .then(project => {
        if (!project) {
          return res.status(404).send({
            message: 'Project Not Found',
          });
        }

        return Task
          .create({
            title: req.body.title,
            assignee_id: req.body.assignee_id,
            project_id: project.id
          })
          .then(task => res.status(201).send(task))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Project
      .findById(req.params.id, {
        include: [{
          model: Task,
          as: 'tasks',
        }],
      })
      .then((project) => {
        if (!project) {
          return res.status(404).send({
            message: 'Project Not Found',
          });
        }
        return res.status(200).send(project);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Project
      .findById(req.params.id, {
        include: [{
          model: Task,
          as: 'tasks',
        }],
      })
      .then(project => {
        if (!project) {
          return res.status(404).send({
            message: 'Project Not Found',
          });
        }
        return project
          .update({
            title: req.body.title || project.title
          })
          .then(() => res.status(200).send(project))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Project
      .findById(req.params.id)
      .then(project => {
        if (!project) {
          return project.status(400).send({
            message: 'Project Not Found',
          });
        }
        return project
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
