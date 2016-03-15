'use strict';

const Hapi = require('hapi');
const Redis = require('redis');

const server = new Hapi.Server();
server.connection({ port: 3044 });
var redis_client = Redis.createClient();

redis_client.on("error", function (err) {
    console.log("Error connecting to Redis" + err);
});

server.register(require('inert'), (err) => {

  if (err) { throw err; }

  require('./backend/routes/static')(server);
  require('./backend/routes/api_todolist')(server, redis_client);

  server.start((err) => {
    if (err) { throw err; }
    console.log('Server running at:', server.info.uri);
  });
});
