// import { useState,useEffect } from 'react'


//  importing CreateToDo file
import {CreateToDo} from '../components/CreateToDo'
import {ToDos} from '../components/ToDos'
import {useNavigate} from 'react-router-dom'
export function Dashboard() {
  const navigate=useNavigate();
  return (
 <div>
   <CreateToDo></CreateToDo>
     <button onClick={()=>{
      navigate("/ToDos")
     }}>Show Todos</button>
   
 </div>
  )
}

