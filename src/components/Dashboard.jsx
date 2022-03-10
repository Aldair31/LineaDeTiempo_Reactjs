import { useState } from 'react';
import '../style/Dashboard.css';
import Themes from './Themes';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LineaDeTiempo from './LineaDeTiempo';
import logo from '../img/Logo.png'

const Dashboard =({usuarios})=>{
	const [open, setOpen]= useState(false)

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
						<p className="usuario" id="nombre_usuario">{usuarios.profileObj.name}</p>
						<img src={usuarios.profileObj.imageUrl} alt="" width="40px"/>
					</div>
				</nav>
			</header>
			
			<main className='contenedor_dashboard'>
				<aside id="aside">
					<nav className={open ? 'sidebarOpen' : 'sidebar'}>
						<a class="op_user" id="op_user" href="">
							{/* <i className="far fa-home"></i> */}
							<i class="fas fa-house-user"></i>
							<span>Ver Perfil</span>
						</a>
						<a id="op_home" href=""
							><i class="fas fa-folder"></i>
							<span>Temas</span>
						</a>
						<a id="op_sign_out" href="">
							<i class="fas fa-sign-out-alt"></i>
							<span>Salir</span>
						</a>
					</nav>
				</aside>
				<div class="contenido" >
					<Themes id={usuarios.profileObj.googleId}/>
				</div>
				{/* <BrowserRouter>
					<Routes>
						<Route
							path='/LineaDeTiempo/:id'
							element={<LineaDeTiempo/>}
						/>
					</Routes>
				</BrowserRouter>  */}
			</main>
		</div>
		<div>
		{/* <BrowserRouter>
			<Routes>
				<Route
					path='/LineaDeTiempo/:id'
					element={<LineaDeTiempo/>}
				/>
			</Routes>
		</BrowserRouter> */}
		
			
				
			
		</div>
    	</>
    );
};

export default Dashboard;
