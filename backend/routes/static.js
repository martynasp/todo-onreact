function AddStaticRoute(server){
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
        index: true
      }
    }
  });
}

module.exports = AddStaticRoute;
