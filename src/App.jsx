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
    return stagesNames.map((value, index) => (
      <div key={index}>
        <h3>{value}</h3>
        <ul data-test-id={`stage-${index}`}>
          {stagesTasks[index].map((task) => (
            <li key={`${task}-${index}`} className="task-item">
              <button type="button" onClick={() => onRetreat(task)}>&larr;</button>
              <span>
                {task.name}
              </span>
              <button type="button" onClick={() => onAdvance(task)}>&rarr;</button>
              <button type="button" onClick={() => onDelete(task.name)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    ))
  }

  const onCreate = () => {
    const newTask = {name: newTaskName, stage: 0}
    setTasks([...tasks, newTask])
    setNewTaskName('')
  }

  const onDelete = (value) => {
    const foundIndex = tasks.filter((t, index) => t.name !== value)
    setTasks(foundIndex)
  }

  const onAdvance = (task) => {
    if (task.stage < 3) {
      setTasks(tasks.map(t =>
        t.name === task.name ? {...t, stage: t.stage + 1} : t
      ));
    }
  }

  const onRetreat = (task) => {
    if (task.stage > 0) {
      setTasks(tasks.map(t =>
        t.name === task.name ? {...t, stage: t.stage - 1} : t
      ));
    }
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