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
    const newTask = {name: newTaskName, stage: 1}
    setTasks([...tasks, newTask])
    setNewTaskName('')
  }

  // delete task
  const onDelete = (value) => {
    console.log(value)
    // filter out for specific task so they don't all get deleted
    setTasks( tasks.filter((value) => tasks.name === value))
  }

  // advance task
const onAdvance = (task) => {
  // advance task by changing the stage of the task
  if (task.stage < 3) {
    setTasks(tasks.map(t =>
      t.name === task.name ? {...t, stage: t.stage + 1} : t
    ));
  }
}

const findTask = (task) => {
  
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