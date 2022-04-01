import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import General from './components/General'
import Acceso from "./components/Acceso";
import FormularioDatosUsuario from './components/FormularioDatosUsuario'

function App() {
  return (
    <div>
       <>
      
          <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<General/>}
                />
                <Route
                    path='Login'
                    element={<Acceso/>}
                />
                <Route
                    path='/DatosUsuario'
                    element={<FormularioDatosUsuario/>}
                />
                <Route
                    path='/Dashboard/*'
                    element={<Dashboard/>}
                />
            </Routes>
          </BrowserRouter>
      </>
    </div>
  );
}

export default App;

