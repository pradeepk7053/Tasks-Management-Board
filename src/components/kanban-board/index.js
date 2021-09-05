import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
        
        ],
      input_data:null,
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }
  update_input=value=>{
    this.setState({
      input_data:value.target.value
    })
  }
  add_task= ()=>{
    if(this.state.input_data){
    let copy_of_tasks=  this.state.tasks
    let new_value = ({"name": this.state.input_data, "stage":0})
    copy_of_tasks.push(new_value);
    this.setState({
      tasks:copy_of_tasks
    })
  }
  }
  backword=name=>{
    let fresh_tasks = this.state.tasks
    let copy_of_tasks=  this.state.tasks.find(x=>x.name==name)
    let fresh_task_new = fresh_tasks.filter((item) => item.name !== name)
    let stage = copy_of_tasks.stage
    if(stage!==0){
    copy_of_tasks.stage = copy_of_tasks.stage - 1
    fresh_task_new.push(copy_of_tasks)

    this.setState({
      tasks:fresh_task_new
    })
    }
  }

  forword=name=>{
    let fresh_tasks = this.state.tasks
    let copy_of_tasks=  this.state.tasks.find(x=>x.name==name)
    let fresh_task_new = fresh_tasks.filter((item) => item.name !== name)
    let stage = copy_of_tasks.stage
    if(stage!==3){
      copy_of_tasks.stage = copy_of_tasks.stage + 1
      fresh_task_new.push(copy_of_tasks)
      this.setState({
        tasks:fresh_task_new
      })
    }
  }
  delete=name=>{
    let fresh_tasks = this.state.tasks
    let fresh_task_new = fresh_tasks.filter((item) => item.name !== name)
      this.setState({
        tasks:fresh_task_new
      })
  }


  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input onChange={this.update_input} id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input"/>
          <button type="submit" onClick={this.add_task} className="ml-30" data-testid="create-task-button">Create task</button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button onClick={()=>this.backword(task.name)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                            <i className="material-icons">arrow_back</i>
                                          </button>
                                          <button onClick={()=>this.forword(task.name)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                                            <i className="material-icons">arrow_forward</i>
                                          </button>
                                          <button onClick={()=>this.delete(task.name)} className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}