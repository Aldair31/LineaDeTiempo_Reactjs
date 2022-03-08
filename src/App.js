import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PaginaPrincipal from "./components/PaginaPrincipal";

function App() {
  const [user, setUser]= useState(null)
  return (
    <div>  
        {/* <PaginaPrincipal/> */}
       <>
      <BrowserRouter>
        <Routes>
            <Route
                path='/'
                element={<PaginaPrincipal/>}
            />
            <Route
                path='/Registrarse'
                element={<Login/>}
            />
            <Route
                path='/Login'
                element={<Login/>}
            />
            {/* {user && (
              <Route
                path='/Dashboard'
                element={<Dashboard usuarios={()=>setUser(true)}/>}
              />
            )} */}
            
        </Routes>
      </BrowserRouter>
      </>
      
      
      {/* <Login/>  */}
      {/* <Dashboard/> */}
    </div>
  );
}

export default App;

