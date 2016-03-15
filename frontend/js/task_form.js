var TaskForm = React.createClass({
  getInitialState: function() {
    return {title: '', error: ''};
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  validateTask: function(task_list) {
    var title = this.state.title.trim();
    if (!title) {
      this.setState({title: '', error: 'Please give task name'});
      return false;
    }
    for (var i in task_list.state.data) {
      var task = this.props.list.state.data[i];
      if (task.title === title) {
        this.setState({title: title, error: 'This task already exists'});
        return false;
      }
    }
    this.setState({title: title, error: ''});
    return true;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var task_list = this.props.list;
    if (!this.validateTask(task_list)) { return false; }
    this.props.httpService.post(task_list.props.url, {title: this.state.title}, function(object){
      task_list.state.data.push(object);
      task_list.setState({data: task_list.state.data});
    });
    this.setState({title: '', error: ''});
  },
  render: function() {
    return (
      <form className="new-task" onSubmit={this.handleSubmit}>
        <div className="error">
          { this.state.error }
        </div>
        <input type="text" placeholder="New task" value={this.state.title} onChange={this.handleTitleChange} />
        <input type="submit" value="Add" />
      </form>
    );
  }
});
