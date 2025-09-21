import { useState,useEffect } from 'react'
import './App.css'

//  importing CreateToDo file
import {CreateToDo} from './components/CreateToDo'
import {ToDos} from './components/ToDos'
function App() {
  const [todos,setTodos] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
      });
  }, []);
  return (
 <div>
   <CreateToDo></CreateToDo>
   <ToDos todos={todos}></ToDos>
 </div>
  )
}

export default App
