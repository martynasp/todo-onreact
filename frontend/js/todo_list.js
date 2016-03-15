var TodoList = React.createClass({
  loadListFromServer: function() {
    var that = this;
    httpService.get(this.props.url, function(object){
      that.setState({data: object});
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadListFromServer();
  },
  render: function() {
    return (
      <div className="todo-list">
        <h1>TODO list</h1>
        <TaskForm list={this} httpService={httpService}/>
        <TaskList list={this} httpService={httpService}/>
      </div>
    );
  }
});
