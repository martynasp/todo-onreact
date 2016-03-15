function TodoStoring(redis_client) {

  const listHolder = 'todoappy.list';

  var listLength = 0;

  function listParser(object) {
    var data  = [];
    var i = 0;
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        i += 1;
        data.push({id: i, title: property, state: object[property]});
        listLength = i;
      }
    }
    return data;
  }

  function List(callback){
    redis_client.hgetall(listHolder, function(err, object) {
      callback(listParser(object));
    });
  }

  function Create(task, callback) {
    var object = {};
    object[task.title] = 0;
    redis_client.hmset(listHolder, object);
    listLength += 1;
    task['id'] = listLength;
    task['state'] = '0';
    callback(task);
  }

  function Update(task, callback) {
    var object = {};
    object[task.title] = task.state;
    redis_client.hmset(listHolder, object);
    callback(task);
  }

  function Delete(task, callback) {
    redis_client.hdel(listHolder, task.title);
    callback(task);
  }

  return {
    list: List,
    create: Create,
    update: Update,
    delete: Delete
  }
}

module.exports = TodoStoring
