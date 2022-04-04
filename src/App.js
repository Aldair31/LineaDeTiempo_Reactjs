import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import General from './components/General'
import Acceso from "./components/Acceso";
import FormularioDatosUsuario from './components/FormularioDatosUsuario'
import ListadoLineasDeTiempoTema from "./components/ListadoLineasDeTiempoTema";
import InicioGeneral from "./components/InicioGeneral";
import Temas from "./components/Temas";
import LineaDeTiempo from "./components/LineaDeTiempo";

import { Provider } from 'react-redux';
import Store from "./Store";
import RootComponent from './components/RootComponent';

function App() {
  return (
    // <Provider store={Store}>
    //   <RootComponent/>
    // </Provider>
    <>
    {/* <RootComponent/> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<General/>}/>
        <Route path="/Login" element={<Acceso/>}/>
        <Route path="/NuevoUsuario" element={<FormularioDatosUsuario/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}>
          <Route path="AgregadasRecientemente" element={<InicioGeneral/>}/>
          <Route path="Temas" element={<Temas/>}/>
          <Route path="Temas/:NombreTema" element={<ListadoLineasDeTiempoTema/>}/>
          <Route path="Temas/:NombreTema/LineaTiempo/:Codigo" element={<LineaDeTiempo/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

