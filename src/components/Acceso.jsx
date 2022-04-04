import React from "react";
import logo from '../img/Logo.png'
import imgLogin from '../img/imgLogin.jpeg'
import { connect } from 'react-redux';
import url from '../keys/backend_keys';
import {useNavigate, BrowserRouter} from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { useState,useEffect } from 'react'
import '../style/general.css';
import '../style/Acceso.css';

const Acceso = ({persona, personaCreado, personaLogeado}) => {
	//asdad
	// const [loginData, setLoginData] = useState(
	// 	localStorage.getItem('loginData')
	// 	  ? JSON.parse(localStorage.getItem('loginData'))
	// 	  : null
	//   );

    // console.log("Persona tu patita: ", persona)

    // useEffect(() => {
    //     const usuarioLogeadoJson = window.localStorage.getItem('loginData')
	// 	if(usuarioLogeadoJson) {
	// 		const usuarioLogeado = JSON.parse(window.localStorage.getItem('loginData'))
	// 		personaLogeado(usuarioLogeado)
	// 	}
    // }, [])

    const [logeado, setLogeado] = useState(null)
    const navigate = useNavigate()

    const responseGoogle = (response) => {
        console.log(response);
        if (!response.error) {
            setLogeado(response) 
        }
    }
    
    useEffect(
        function(){
            if(logeado){
                fetch(`${url}/api/Persona/CrearPersona`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        Nombre: logeado?.profileObj.name,
                        Correo: logeado?.profileObj.email,
                        Foto: logeado?.profileObj.imageUrl,
                        Vigencia: 'A',
                        
                    }),
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                        if(data.ok){
                            personaCreado(data)
                            navigate(`/NuevoUsuario`)
                        }
                        else{
                            localStorage.setItem('loginData', JSON.stringify(data));
                            personaLogeado(data)
                            navigate(`/Dashboard/AgregadasRecientemente`)
                        }
                    })
            }
        },[logeado]
    )
    
    return (
        <div>
            {
                <div>
                    <header className="header">
                        <div className="contenedorIMG">
                            <img src={logo} alt=''></img>
                        </div>
                    </header>
                    <div className="cuerpoAcceso">
                        <div className="contenidoForm">
                            <p>Iniciar Sesión</p>
                            <form className='formularioAcceso'>
                                <div className="btnLogin">
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        buttonText="Continuar con Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                            </form>
                        </div>
                        <img src={imgLogin} alt=''></img>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
	persona: state.persona,
});

const mapDispatchToProps = (dispatch) => ({
	personaCreado(persona) {
		dispatch({
			type: 'PERSONA_CREADO',
			persona,
		});
	},
    personaLogeado(persona) {
		dispatch({
			type: 'PERSONA_LOGEADO',
			persona,
		});
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Acceso);