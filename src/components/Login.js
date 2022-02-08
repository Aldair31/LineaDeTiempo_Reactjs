import { GoogleLogin } from 'react-google-login';
import { useState,useEffect } from 'react'
import '../style/styles.css'
import img from '../img/cronograma.png'
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
                fetch(`http://localhost:8000/api/register`, {
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
                        // if (data.ok) {
                        //     alert('Actualizado correctamente');
                        // }
                        console.log(data)
                    })
            }
        },[logeado]
    )
    
    return (

        <>
    
           
            {
                logeado !== null ? <div>Contenido secreto</div> : null
            }
            {
                <div class="container">
                    <div class="container_form">
                  <img src={img} alt="imagen de linea de tiempo"/>
                  <h2>Iniciar Sesion</h2>
                  <form action="">
                      <div>
                          <input type="text" placeholder="Usuario"/>
                      </div>
                      <div>
                          <input type="password" placeholder="Password"/>
                      </div>
                      <input class="check"type="checkbox" id="checkid"/>
                      <label for="checkid">Recordar</label>
                      <a href="#">Ovidaste tu contraseña</a>
                      <input class= "boton"type="submit" value="Iniciar"/>
                      <div class="btnlogin">
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
            }
        </>
    );
}
export default Login;
//.
