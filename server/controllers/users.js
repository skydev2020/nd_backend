const User = require('../models').User;
const Task = require('../models').Task;

module.exports = {
  create(req, res) {
    return User
      .create({
        name: req.body.name,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return User
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
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));    
  },

  retrieve(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: Task,
          as: 'tasks',
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User with specified id Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: Task,
          as: 'tasks',
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            name: req.body.name || user.name
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User with that id Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
