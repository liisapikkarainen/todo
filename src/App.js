import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost/todo/';

function App() {
  const [task, setTask] = useState('');
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        //console.log(response.data);
        setTasks(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error); // Yhden rivin vastaava koodi alla olevasta if-koodista
        /* if (error.response) {
          alert(error.response.data.error);
        } else {
        alert(error);
        } */
      });
  }, [])
  
  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:task});
    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setTasks(tasks => [...tasks,response.data]);
      setTask('');
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }

  return (
    <div className='container'>
      <form onSubmit={save}>
        <label>New task</label>
        <input value={task} placeholder='Add new task' onChange={e => setTask(e.target.value)}></input>
        <button>Save</button>
      </form>
      <ol>
        {tasks?.map(task =>(
          <li key={task.id}>{task.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
