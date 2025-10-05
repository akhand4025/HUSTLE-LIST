import {useNavigate}  from 'react-router-dom'
import {useState} from 'react'

export function Signup(){
     const [name,setname] = useState("");
    const [password,setpass] = useState("");
    const navigate=useNavigate();


    function handlename(e){
        setname(e.target.value)
    }
     function handlepass(e){
        setpass(e.target.value)
    }

    async function change(){
        try{
        const res =await fetch("http://localhost:3000/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,password})
        });

        const data= await res.json();
        if(res.ok){
            localStorage.setItem("token",data.token);
            navigate("/Dashboard");
        }else{
            alert("user already exist");
        }
    }catch(err){
        alert("something went wrong"+ err);
    }
}
    return(
        <>
       <h1>Signup Page</h1>
      <div className="box1">
          <input type="text" placeholder='username'  onChange={handlename}></input> <br/><br/>
           <input type="password" placeholder='password' onChange={handlepass} ></input><br/><br/>
      </div>
      <button onClick={(change)}>Submit</button>
       </>

    ) 
}