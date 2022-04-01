import React from "react";
import logo from '../img/Logo.png'
import imgLogin from '../img/imgLogin.jpeg'
import { connect } from 'react-redux';
import url from '../keys/backend_keys';
import {useNavigate} from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { useState,useEffect } from 'react'
import '../style/general.css';
import '../style/Acceso.css';

const Acceso = ({persona, personaCreado, personaLogeado}) => {
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
                            navigate(`/DatosUsuario`)
                        }
                        else{
                            personaLogeado(data)
                            navigate(`/Dashboard`)
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
                                        clientId="1056717193966-him0af1q4ed7csfr3n0iol6cct22qkj5.apps.googleusercontent.com"
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