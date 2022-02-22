import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost/todo/';

function App() {
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        //console.log(response.data);
        setTasks(response.data);
      }).catch(error => {
        alert(error);
      });
  }, [])
  
  return (
    <div className='container'>
      <ol>
        {tasks?.map(task =>(
          <li key={task.id}>{task.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
