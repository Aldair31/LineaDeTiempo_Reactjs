import { useState } from 'react';
import { connect } from 'react-redux';
import Themes from './Themes';
import Temas from './Temas'
import ListadoLineasDeTiempoTema from './ListadoLineasDeTiempoTema';
import {Routes, Route, NavLink} from 'react-router-dom';
import LineaDeTiempo from './LineaDeTiempo';
import logo from '../img/Logo.png'
import InicioGeneral from './InicioGeneral';
import { useEffect } from 'react';
import url from '../keys/backend_keys';
import '../style/Dashboard.css';

const Dashboard =({persona, cerrarSesion})=>{
	const [usuario, setUsuario]= useState([]);
	const [open, setOpen]= useState(false);
    const codigo = persona.codigo

    useEffect(() => {
        fetch(`${url}/api/Persona/BuscarPersona/${codigo}`)
            .then((resp) => resp.json())
            .then((data) => {
                setUsuario(data);
            });
    }, []);
	
    return(
        <>
			<div>
				<header id="header" className='headerDashboard'>
					<nav>
						<div className="header_left">
							<div className="btn_ops">
								<button className="ops" onClick={()=>{setOpen(!open)}}>
									<i class="fas fa-bars"></i>
								</button>
							</div>
							<img src={logo} alt=""></img>
						</div>
						<div className="header_rigth" id="header_rigth">
							<p className="usuario" id="nombre_usuario">{usuario.Nombre}</p>
							<img src={usuario.Foto} alt="" width="40px"/>
						</div>
					</nav>
				</header>
				
				<main className='contenedor_dashboard'>
					<aside id="aside">
						<nav className={open ? 'sidebarOpen' : 'sidebar'}>
							<NavLink className="opcion" id="op_user" to={`/Dashboard`}>
								<i class="fas fa-house-user"></i>
								<span>Inicio</span>			
							</NavLink>
							<NavLink className="opcion" id="op_home" to={`Temas`}
								><i class="fas fa-folder"></i>
								<span>Temas</span>
							</NavLink>
							<NavLink className="opcion" id="op_sign_out" to="/" onClick={()=>{cerrarSesion()}}>
								<i class="fas fa-sign-out-alt"></i>
								<span>Salir</span>
							</NavLink>
						</nav>
					</aside>
					<div class="contenido" >
						<Routes>
							<Route
								path='/'
								element={<InicioGeneral/>}
							/>
							<Route
								path='/Temas'
								element={<Temas codigo={codigo}/>}
							/>
							{/* <Route
								path='LineaDeTiempo/:id'
								element={<ListadoLineasDeTiempoTema/>}
							/> */}
							{/* <Route
								path='/Eventos'
								element={<LineaDeTiempo/>}
							/> */}
						</Routes>
					</div>
				</main>
			</div>
    	</>
    );
};

const mapStateToProps = (state) => ({
	persona: state.persona,
});

const mapDispatchToProps = (dispatch) => ({
	cerrarSesion(persona) {
		dispatch({
			type: 'CERRAR_SESION',
			persona,
		});
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
