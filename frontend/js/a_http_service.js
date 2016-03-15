function TodoListHttpService(JSON) {

  function handleRequest(xhr, callback) {
    var DONE = 4; // readyState 4 means the request is done.
    if (xhr.readyState === DONE) {
      if (xhr.status >= 200 && xhr.status < 400) {
        if (callback) {
          callback(JSON.parse(xhr.responseText))
        }
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  };

  function Get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
      handleRequest(xhr, callback);
    };
  };

  function Post(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
      handleRequest(xhr, callback);
    };
  };

  return {
    get: Get,
    post: Post
  };
};

var httpService = TodoListHttpService(JSON);
