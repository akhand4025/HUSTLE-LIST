import {BrowserRouter,Routes,Route}  from "react-router-dom";
import {Signin} from "./pages/signin"
import {Signup} from "./pages/Signup"
import {Landing} from "./pages/Landing"
import {Dashboard} from "./pages/Dashboard"
import {ToDos} from "./components/ToDos"
function App(){
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/Dashboard"  element={<Dashboard/>}></Route>
      <Route path="/Signin"  element={<Signin/>}></Route>
      <Route path="/Signup"  element={<Signup/>}></Route>
      <Route path="/"  element={<Landing/>}></Route>
      <Route path="/ToDos"  element={<ToDos/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}


export default App