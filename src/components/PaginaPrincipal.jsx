import React, { useState } from "react";
import img1 from '../img/imgEPICI.jpeg'
import '../style/PaginaPrincipal.css'
import img2 from '../img/imgLineaDeTiempo.jpeg'
import img3 from '../img/imgUNPRG.jpeg'
import img4 from '../img/imgEPICI.jpeg'
import { BrowserRouter,Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Login from './Login';

const PaginaPrincipal = () =>{
    // const [openlogin, setOpenlogin]=useState(false);
    const navigate= useNavigate()
    const handleClick = () =>{
        navigate('Login')
    }
    const handleClick1 = () =>{
        navigate('Registrarse')
    }
    return(
        <>
        {/* {openlogin && <Login/>} */}
        <header className="header_Principal">
                <div className="imagen_EPICI">
                    <img src={img1} alt=""/>
                </div>
                <div className="header_enlaces">
                    {/* <a href="">Ingresar</a> */}
                    <button 
                    onClick={handleClick}
                    >
                        Ingresar
                    </button>
                    
                   
                    <div className="linea_enlaces"></div>
                    <a href="">Sobre Nosotros</a>
                </div>
            </header>
            <body className="pagina_informativa">
                <section className="seccion_registrarse">
                    <div className="seccion_texto">
                        <h2>TimeLine</h2>
                        <h3>Crea&nbsp;&nbsp;&nbsp;&nbsp;tu&nbsp;&nbsp;&nbsp;&nbsp;propia linea de tiempo</h3>
                        <p>Nuestra aplicación, te permite crear temas para 
                            cada línea de tiempo que tengas, 
                            esto te dará el control de todo lo que crees.
                        </p>
                        <div>
                            {/* <NavLink
                                to='/Login'
                                className='btn_registrarse'
                            >
                                <button>
                                    Registrate gratis
                                </button>
                            </NavLink> */}
                        </div>
                                                             
                        
                        <div className="btn_registrarse">
                            <button 
                            onClick={handleClick1}
                            >
                                Regístrate gratis
                            </button>
                        </div>
                    </div>
                    <div className="seccion_imagen">
                        <div className="imagen_LineaDeTiempo">
                            <img src={img2} alt="" />
                        </div>
                        <div className="cuadrantes">
                            <div className="cuadrante">Crea Temas</div>
                            <div className="cuadrante">Crea Líneas</div>
                            <div className="cuadrante">Comparte</div>
                        </div>
                    </div>
                </section>
                {/* <div className="seccion_botones">
                    
                    
                </div> */}
                <section className="seccion_aprende_como">
                    <h2>APRENDE CÓMO</h2>
                    <div className="seccion_aprende">
                        <div className="aprende_como">
                            <i class="fas fa-folder"></i>
                            <div className="cuadro">
                                <div>Crea Temas</div>
                            </div>
                        </div>
                        <div className="aprende_como_texto">
                            <p>
                                Podrás crear temas que te servirán 
                                para identificar más rápido el 
                                contenido de tu linea de tiempo.
                            </p>
                        </div>
                        
                    </div>
                    <div className="seccion_aprende">
                        <div className="aprende_como">
                            <i class="fas fa-clock"></i>
                            <div className="cuadro">
                                <div>Crea Líneas</div>
                            </div>
                        </div>
                        
                        <div className="aprende_como_texto">
                            <p>
                                Ingresa el nombre de tu linea de tiempo 
                                y dentro de ella crea diferentes eventos 
                                los cuales formarán parte de la misma.
                            </p>
                        </div>
                    </div>
                    <div className="seccion_aprende">
                        <div className="aprende_como">
                            <i class="fas fa-share"></i>
                            <div className="cuadro">
                                <div>Comparte</div>
                            </div>
                        </div>
                        <div className="aprende_como_texto">
                            <p>
                                Una vez terminada tu linea de tiempo,
                                podrás compartirlo con los que tú quieras.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="seccion_organizado_por">
                    <h2>ORGANIZADO POR</h2>
                    <div className="seccion_organizado">
                        <div className="imagen_UNPRG">
                            <img src={img3} alt="" />
                        </div>
                        <div className="imagen_FACFYM">
                            <img src={img4} alt="" />
                        </div>
                    </div>
                </section>
                <section className="seccion_nosotros">
                    <h2>NOSOTROS</h2>
                    <div className="nosotros">
                        <div className="nosotros_1">
                            <h3>Díaz Ramón Aldair Erikson</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="nosotros_2">
                            <h3>Maquen Vidaurre Luis David</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="nosotros_3">
                            <h3>Tezén Villanueva Elvis Arturo</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="nosotros_4">
                            <h3>Tirado Julca Gianmarco</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="nosotros_5">
                            <h3>Veliz Chempén Diego Armando</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="nosotros_6">
                            <h3>Terán Santa Cruz Franklin Edinson</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                </section>
            </body>
            <footer className="barra_footer">
                <p>2022 Copyright: timeline.com</p>
            </footer>
            {/* <>
                <Routes>
                    <Route
                        path='/Login'
                        element={<Login/>}
                    />
                </Routes>
            </> */}
       
            
            
        </>
        
    )
}

export default PaginaPrincipal