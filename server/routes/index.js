const todosController = require('../controllers').todos;
const tasksController = require('../controllers').tasks;
const usersController = require('../controllers').users;
const todoItemsController = require('../controllers').todoItems;
const commentsController = require('../controllers').comments;
const projectsController = require('../controllers').projects;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.get('/api/users', usersController.list);
  app.post('/api/users', usersController.create);
  app.get('/api/users/:id', usersController.retrieve);
  app.put('/api/users/:id', usersController.update);
  app.delete('/api/users/:id', usersController.destroy);

  app.get('/api/tasks', tasksController.list);
  app.post('/api/tasks', tasksController.create);
  app.put('/api/tasks/:id', tasksController.update);
  app.delete('/api/tasks/:id', tasksController.destroy);
  app.get('/api/tasks/:id', tasksController.retrieve);
  app.put('/api/tasks/:id/assign', tasksController.assign);
  app.put('/api/tasks/:id/unassign', tasksController.unassign);
  app.post('/api/tasks/:id/add_comment', tasksController.addComment);

  app.get('/api/comments', commentsController.list);
  app.post('/api/comments', commentsController.create);
  app.get('/api/comments/:id', commentsController.retrieve);
  app.put('/api/comments/:id', commentsController.update);
  app.delete('/api/comments/:id', commentsController.destroy);

  app.get('/api/projects', projectsController.list);
  app.post('/api/projects', projectsController.create);
  app.get('/api/projects/:id', projectsController.retrieve);
  app.put('/api/projects/:id', projectsController.update);
  app.delete('/api/projects/:id', projectsController.destroy);
  app.post('/api/projects/:id/add_task', projectsController.addTask);

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);

  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete(
    '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  );
  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
