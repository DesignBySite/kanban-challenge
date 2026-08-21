import { useState } from "react";
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [newTaskName, setNewTaskName] = useState("");

  const [stagesNames] = useState([
    "Backlog",
    "To Do",
    "Ongoing",
    "Done"
  ])

  let stagesTasks = [];

  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  };

  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  const stageComponents = () => {
    console.log('Tasks', tasks)
    return stagesNames.map((value, index) => (
      <div key={index}>
        <h3>{value}</h3>
        <ul data-test-id={`stage-${index}`}>
          {stagesTasks[index].map((task) => (
            <li key={`${value}-${index}`}>
              <span>
                {task.name}
              </span>
              <button type="button" onClick={() => onAdvance(task)}>`&gt;`</button>
              <button type="button" onClick={() => onDelete(task.name)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    ))
  }

  // create task
  const onCreate = () => {
    console.log(newTaskName)
    const newTask = {name: newTaskName, stage: 0}
    setTasks([...tasks, newTask])
    setNewTaskName('')
  }

  // delete task
  const onDelete = (value) => {
    console.log(value)
    setTasks(tasks.filter((value) => tasks.name === value))
  }

  // advance task
const onAdvnace = () => {
  
}
  return (
    <>
      <div>Hello</div>
      <div>
        <input 
          value={newTaskName}
          onChange={e => setNewTaskName(e.target.value)}/>
        <button type="button" onClick={onCreate}>Create</button>
      </div>
      <div className="board">
        {stageComponents()}
      </div>
    </>
  )
}

export default App;