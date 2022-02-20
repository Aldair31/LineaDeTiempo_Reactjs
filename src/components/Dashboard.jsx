import { useState } from 'react';
import '../style/Dashboard.css';
import Themes from './Themes';

const Dashboard =({usuarios})=>{
	const [open, setOpen]= useState(false)

    return(
        <>
		<div>
			<header id="header">
				<nav>
					<div className="header_left">
						<div id="btn_ops">
							<button id="ops" onClick={()=>{setOpen(!open)}}>
								<i class="fas fa-bars"></i>
							</button>
						</div>
						<h3>LINEA DE TIEMPO</h3>
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
							<i className="far fa-user"></i>
							<span>Ver Perfil</span>
						</a>
						<a id="op_home" href=""
							><i class="fas fa-home"></i>
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
			</main>
		</div>
    	</>
    );
};

export default Dashboard;
