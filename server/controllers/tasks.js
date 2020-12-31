const Task = require('../models').Task;

module.exports = {
  // create(req, res) {
  //   return Task
  //     .create({
  //       title: req.body.title,
  //       assignee_id: req.params.assignee_id,
  //     })
  //     .then(task => res.status(201).send(task))
  //     .catch(error => res.status(400).send(error));
  // },

  list(req, res) {
    return Task
      .findAll({
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then((tasks) => res.status(200).send(tasks))
      .catch((error) => res.status(400).send(error))
  },

  // update(req, res) {
  //   return Task
  //     .find({
  //       where: {
  //         id: req.params.id,
  //       },
  //     })
  //     .then(task => {
  //       if (!task) {
  //         return res.status(404).send({
  //           message: 'Task Not Found',
  //         });
  //       }

  //       return task
  //         .update({
  //           title: req.body.title || task.title,
  //         })
  //         .then(updatedTask => res.status(200).send(updatedTask))
  //         .catch(error => res.status(400).send(error));
  //     })
  //     .catch(error => res.status(400).send(error));
  // },

  // destroy(req, res) {
  //   return Task
  //     .findById(req.params.todoItemId)
  //     .then(task => {
  //       if (!task) {
  //         return res.status(404).send({
  //           message: 'Task Not Found',
  //         });
  //       }

  //       return task
  //         .destroy()
  //         .then(() => res.status(204).send())
  //         .catch(error => res.status(400).send(error));
  //     })
  //     .catch(error => res.status(400).send(error));
  // },
};