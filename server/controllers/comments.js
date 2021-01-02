const Task = require('../models').Task;
const User = require('../models').User;
const Comment = require('../models').Comment;

module.exports = {
  create(req, res) {
    return Comment
      .create({
        content: req.body.content,
        created_by: req.body.created_by,
        task_id: req.body.task_id
      })
      .then(comment => res.status(201).send(comment))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Comment
      .findAll({
        include: [{
          model: User,
          as: 'user',
        },{
          model: Task,
          as: 'task',
        }],
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then((comments) => res.status(200).send(comments))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Comment
      .find({
        where: {
          id: req.params.id,
        },
      })
      .then(comment => {
        if (!comment) {
          return res.status(404).send({
            message: 'Comment Not Found',
          });
        }

        return comment
          .update({
            content: req.body.content || comment.content,
            created_by: req.body.created_by || comment.created_by,
            task_id: req.body.task_id || comment.task_id
          })
          .then(updatedComment => res.status(200).send(updatedComment))
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

  retrieve(req, res) {
    return Comment
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'user',
        },{
          model: Task,
          as: 'task',
        }]
      })
      .then((comment) => {
        if (!comment) {
          return res.status(404).send({
            message: 'Comment Not Found',
          });
        }
        return res.status(200).send(task);
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Comment
      .findById(req.params.id)
      .then(comment => {
        if (!comment) {
          return res.status(404).send({
            message: 'Comment Not Found',
          });
        }

        return comment
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
