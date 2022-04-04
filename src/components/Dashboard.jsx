import { useState } from 'react';
import { connect } from 'react-redux';
import Themes from './Themes';
import Temas from './Temas'
import ListadoLineasDeTiempoTema from './ListadoLineasDeTiempoTema';
import {BrowserRouter, Routes, Route, NavLink, Outlet} from 'react-router-dom';
import LineaDeTiempo from './LineaDeTiempo';
import logo from '../img/Logo.png'
import InicioGeneral from './InicioGeneral';
import { useEffect } from 'react';
import url from '../keys/backend_keys';
import '../style/Dashboard.css';
import General from './General';
import Acceso from './Acceso';

const Dashboard =({persona, cerrarSesion})=>{
	// const [loginData, setLoginData] = useState(
	// 	localStorage.getItem('loginData')
	// 	? JSON.parse(localStorage.getItem('loginData'))
	// 	: null
	// );

	
	persona = 
	localStorage.getItem('loginData')
	? JSON.parse(localStorage.getItem('loginData'))
	: null
	
	console.log("Persona tu patita: ", persona)

	// let CodigoPersona

	// if(loginData)
	// 	CodigoPersona=loginData.codigo
	// else
	// 	CodigoPersona=persona.codigo

	const CodigoPersona = persona.codigo

	const [open, setOpen]= useState(false);
    // const CodigoPersona = persona.codigo

    const [datosUsuario, setDatosUsuario] = useState({})
    useEffect(() => {
        fetch(`${url}/api/Usuario/BuscarUsuarioCodigoPersona/${CodigoPersona}`)
        .then((resp) =>{
            return resp.json();
        })
        .then((data) =>{
            setDatosUsuario(data)
        });
    }, [])

    const [datosPersona, setDatosPersona] = useState({})
    useEffect(() => {
        fetch(`${url}/api/Persona/BuscarPersona/${CodigoPersona}`)
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            setDatosPersona(data)
        });
    }, [])
	
    return(
        <>
			<div>
				<header id="header" className='headerDashboard'>
					<nav>
						<div className="header_left">
							<div className="btn_ops">
								<button className="ops" onClick={()=>{setOpen(!open)}}>
									<i className="fas fa-bars"></i>
								</button>
							</div>
							<img src={logo} alt=""></img>
						</div>
						<div className="header_rigth" id="header_rigth">
							<p className="usuario" id="nombre_usuario">{datosUsuario.NombreUsuario}</p>
							<img src={datosPersona.Foto} alt="" width="40px"/>
						</div>
					</nav>
				</header>
				
				<main className='contenedor_dashboard'>
					<aside id="aside">
						<nav className={open ? 'sidebarOpen' : 'sidebar'}>
							<NavLink className="opcion" id="op_user" to={`AgregadasRecientemente`}>
								<i className="fas fa-house-user"></i>
								<span>Inicio</span>			
							</NavLink>
							<NavLink className="opcion" id="op_home" to={`Temas`} state={{Codigo: datosUsuario.Codigo}}
								><i className="fas fa-folder"></i>
								<span>Temas</span>
							</NavLink>
							<NavLink className="opcion" id="op_sign_out" to="/Login" onClick={()=>{cerrarSesion()}}>
								<i className="fas fa-sign-out-alt"></i>
								<span>Salir</span>
							</NavLink>
						</nav>
					</aside>
					<div className="contenido" >
						<Outlet/>
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
