import {useState,useEffect} from "react"
export function ToDos(){
     const [todos,setTodos] = useState([])
  const token =localStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:3000/todos",{
      method: "GET",
  headers: {
    "Content-Type": "application/json",
    // sending token
    "Authorization": `Bearer ${token}`, 
  },
    })
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
      });
  }, []);

     const handleDelete=async(id)=>{
      try{
        const res = await fetch("http://localhost:3000/delt",{
                method:"DELETE",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({ id }),
            })
            if(res.ok){
              setTodos(todos.filter(todo=>todo._id!==id));
            }else{
              alert("failed to delete todo"+await res.json().msge);
            }
      }catch(err){
        alert("something went wrong"+err);
      }
     }
 

    //   this for update the todo

    const handleupdate=async(id)=>{
      try{
        const res = await fetch("http://localhost:3000/completed",{
                method:"PUT",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({ id }),
            })
            if(res.ok){
              setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, completed: true } : todo
      ));
            }else{
              alert("failed update"+await res.json().msge);
            }
      }catch(err){
        alert("something went wrong"+err);
      }
     }

    return <div>
      <div className="todos-page">
  <h1>All Todos</h1>
  <div className="todos-container">
    {todos.map((todo, idx) => (
      <div key={idx} className="todo-card">
        <h2 className="todo-title">{todo.title}</h2>
        <p className="todo-description">{todo.description}</p>
        <button  onClick={() => handleupdate(todo._id)} className={`todo-btn ${todo.completed ? "completed" : ""}`}>
          {todo.completed ? "Completed" : "Mark as Complete"}
        
        </button>
        <button
                className="todo-btn"
                style={{ backgroundColor: "#f44336" }} // red delete button
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
      </div>
    ))}
  </div>
</div>

    </div>

}
