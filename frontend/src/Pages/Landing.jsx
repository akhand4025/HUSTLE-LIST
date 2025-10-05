import '../App.css'
import { useNavigate } from 'react-router-dom';
export function Landing(){
    const navigate=useNavigate();
    return (
        <>
        <h1>HUSTLE LIST</h1>
        <div className="Landing">
             <button onClick={()=>{
                navigate("/Signin");
             }}>Signin</button>{"    "}
             <button onClick={()=>{
                navigate("/Signup")
             }}>Signup</button>
     </div>
    </>
    )
}