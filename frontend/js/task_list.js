var TaskList = React.createClass({
  render: function() {
    var task_list = this.props.list;
    var taskNodes = task_list.state.data.map(function(task) {
      return (
        <Task title={task.title} key={task.id} state={task.state} list={task_list} httpService={task_list.props.httpService}>
        </Task>
      );
    });
    return (
      <ul className="task-list">
        {taskNodes}
      </ul>
    );
  }
});
