import {useState} from 'react'
export function CreateToDo(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
async function handleadd(){
    const token=localStorage.getItem("token");
    const res= await fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description
      }),
      headers: {
        "Content-Type": "application/json",
        // SEND THE TOKEN HERE 
        "Authorization": `Bearer ${token}` 
      }
    })
    const data= await res.json();
    if(res.ok){
        alert("todo added successfully");
    }else{
        alert(data.msge)
    }
}

    return <div>
        <input id="title" type="text" placeholder="title" onChange={function(e){
            setTitle(e.target.value);
        }}></input> <br/><br/>
        <input id ="des" type="text" placeholder="description" onChange={function(e){
                     setDescription(e.target.value);
        }}></input> <br/><br/>
       <button  onClick={(handleadd)}>Add Todo</button>
    </div>
}