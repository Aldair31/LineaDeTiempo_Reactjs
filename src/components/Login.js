import { GoogleLogin } from 'react-google-login';
import { useState,useEffect } from 'react'

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
                logeado == null ? <GoogleLogin
                    clientId="1056717193966-him0af1q4ed7csfr3n0iol6cct22qkj5.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                /> : null
            }
            {
                logeado !== null ? <div>Contenido secreto</div> : null
            }
            {
               <div>
                    <div>Hola {logeado?.profileObj.name}</div>
                    <div><img src={logeado?.profileObj.imageUrl}/></div>
                    <div>{logeado?.profileObj.googleId}</div>
               </div>
            }
        </>
    );
}
export default Login;
