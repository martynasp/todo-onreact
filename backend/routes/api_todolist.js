function AddApiTodoListRoutes(server, redis_client){

  const todoStoring = require('../services/todo_storing')(redis_client);

  server.route({
    method: 'GET',
    path: '/api/todolist',
    handler: function (request, reply) {
      todoStoring.list(function(object) {
        reply(object);
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/api/todolist',
    handler: function (request, reply) {
      todoStoring.create({title: request.payload.title}, function(object) {
        reply(object);
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/api/todolist/toggledone',
    handler: function (request, reply) {
      todoStoring.update({title: request.payload.title, state: request.payload.state}, function(object) {
        reply(object);
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/api/todolist/delete',
    handler: function (request, reply) {
      todoStoring.delete({title: request.payload.title}, function(object) {
        reply(object);
      });
    }
  });
}

module.exports = AddApiTodoListRoutes;
