import { GoogleLogin } from 'react-google-login';
import { useState,useEffect } from 'react'
import '../style/Login.css'
import img from '../img/cronograma.png'
import url from '../keys/backend_keys';
import Dashboard from './Dashboard';
//
function Login() {

    const [logeado, setLogeado] = useState(null)
    const responseGoogle = (response) => {
        console.log(response);
        setLogeado(response)
    }
    useEffect(
        function(){
            if(logeado!=null){
                fetch(`${url}/api/register`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        codigo: logeado?.profileObj.googleId,
                        name: logeado?.profileObj.name,
                        email: logeado?.profileObj.email,
                        photo: logeado?.profileObj.imageUrl,
                        current: true,
                        
                    }),
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                        console.log(data)
                    })
            }
        },[logeado]
    )
    
    return (
        <>
            {
                logeado !== null ? 
                <div><Dashboard usuarios={logeado}/></div> 
                :
                <div class="imgContainer">
                    <div className='container'>
                        <div className="container_form">
                            <h2>Iniciar Sesion</h2>
                            <img src={img} alt="imagen de linea de tiempo"/>
                            <br />
                            <br />
                            <form className='formulario'>
                                <div className="btnlogin">
                                {
                                    logeado == null ? <GoogleLogin
                                        clientId="1056717193966-him0af1q4ed7csfr3n0iol6cct22qkj5.apps.googleusercontent.com"
                                        buttonText="Continuar con Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    /> : null
                                }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default Login;
//.
