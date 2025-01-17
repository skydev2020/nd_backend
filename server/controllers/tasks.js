const Task = require('../models').Task;
const User = require('../models').User;
const Comment = require('../models').Comment;
const Project = require('../models').Project;

module.exports = {
  create(req, res) {
    return Task
      .create({
        title: req.body.title,
        assignee_id: req.body.assignee_id,
        project_id: req.body.project_id,
      })
      .then(task => res.status(201).send(task))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Task
      .findAll({
        include: [{
          model: User,
          as: 'assignee',
        },{
          model: Project,
          as: 'project',
        }],
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then((tasks) => res.status(200).send(tasks))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Task
      .find({
        where: {
          id: req.params.id,
        },
      })
      .then(task => {
        if (!task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }

        return task
          .update({
            title: req.body.title || task.title,
            assignee_id: req.body.assignee_id || task.assignee_id,
            project_id: req.body.project_id || task.project_id,
          })
          .then(updatedTask => res.status(200).send(updatedTask))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  // assign the task to specific user
  //This feature is similar to upate but just change assignee_id attribute
  assign(req, res) {
    return Task
      .find({
        where: {
          id: req.params.id,
        },
      })
      .then(task => {
        if (!task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }

        return task
          .update({
            assignee_id: req.body.assignee_id || task.assignee_id,
          })
          .then(updatedTask => res.status(200).send(updatedTask))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  unassign(req, res) {
    return Task
      .find({
        where: {
          id: req.params.id,
        },
      })
      .then(task => {
        if (!task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }

        return task
          .update({
            assignee_id: null,
          })
          .then(updatedTask => res.status(200).send(updatedTask))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  //Add Comment
  addComment(req, res) {
    return Task
      .find({
        where: {
          id: req.params.id,
        },
      })
      .then(task => {
        if (!task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }

        return Comment
          .create({
            content: req.body.content,
            created_by: req.body.user_id,
            task_id: task.id
          })
          .then(comment => res.status(201).send(comment))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Task
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'assignee',
        },{
          model: Project,
          as: 'project',
        }],
      })
      .then((task) => {
        if (!task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }
        return res.status(200).send(task);
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Task
      .findById(req.params.id)
      .then(task => {
        if (!task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }

        return task
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
