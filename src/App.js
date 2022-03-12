import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PaginaPrincipal from "./components/PaginaPrincipal";
import General from './components/General'
import Acceso from "./components/Acceso";
import FormularioDatosUsuario from '../src/components/FormularioDatosUsuario'

function App() {
  const [user, setUser]= useState(null)
  return (
    <div>  
        {/* <PaginaPrincipal/> */}
        <Acceso/>
        {/* <FormularioDatosUsuario/> */}
       <>
      {/* <BrowserRouter>
        <Routes>
            <Route
                path='/'
                element={<General/>}
            />
            <Route
                path='/Login/'
                element={<Acceso/>}
            />
           {user && (
              <Route
                path='/Dashboard'
                element={<Dashboard usuarios={()=>setUser(true)}/>}
              />
            )}
        </Routes>
      </BrowserRouter> */}
      </>
    </div>
  );
}

export default App;

