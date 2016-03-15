var Task = React.createClass({
  handleDelete: function(e) {
    e.preventDefault();
    var task_list = this.props.list;
    var task = {title: this.props.title};
    httpService.post(task_list.props.url+'/delete', task, function(object){
      var tasks = [];
      for (var i in task_list.state.data) {
        var list_task = task_list.state.data[i];
        task.title === list_task.title ? null : tasks.push(list_task);
      }
      task_list.setState({data: tasks});
    });
  },
  handleState: function(e) {
    e.preventDefault();
    var task_list = this.props.list;
    var task = {title: this.props.title};
    task.state = (this.props.state === '0' ? '1' : '0');
    httpService.post(task_list.props.url+'/toggledone', task, function(object){
      var tasks = [];
      for (var i in task_list.state.data) {
        var list_task = task_list.state.data[i];
        if (task.title === list_task.title) { list_task.state = task.state; };
        tasks.push(list_task);
      }
      task_list.setState({data: tasks});
    });
  },
  render: function() {
    return (
      <li className={ this.props.state === '0' ? '' : 'done' }>
        <a onClick={this.handleDelete} href="#">
          x
        </a>
        <a href="#" onClick={this.handleState} className="toggle-done">
          &#x2713;
        </a>
        <span className="title">
          { this.props.title }
        </span>
      </li>
    );
  }
});
