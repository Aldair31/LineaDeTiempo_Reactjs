import { GoogleLogin } from 'react-google-login';
import { useState,useEffect } from 'react'
import '../style/Login.css'
import img from '../img/imgLogin.jpeg'
import img1 from '../img/imgEPICI.png'
import url from '../keys/backend_keys';
import Dashboard from './Dashboard';
import { BrowserRouter,Routes, Route, NavLink, useNavigate} from 'react-router-dom';


//
function Login() {

    const [logeado, setLogeado] = useState(null)
    const responseGoogle = (response) => {
        console.log(response);
        setLogeado(response)
        // navigate("Dashboard")
    }
    // const navigate= useNavigate()
    // const handleClick = () =>{
    //     navigate("Dashboard")
    // }
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
                <div>
                    {/* <Link to={'Inicio'}/> */}
                    <Dashboard usuarios={logeado}/>

                    {/* <BrowserRouter>
                        <Routes>
                            <Route
                                path='/Dashboard'
                                element={<Dashboard usuarios={logeado}/>}
                            />
                        </Routes>
                    </BrowserRouter> */}
                </div> 
                :
                <div class="imgContainer">
                    {/* <div className='lineaLogin'>
                        <h2>Bienvenido a TimeLine</h2>
                    </div> */}
                    <header className="header">
                        <div className="contenedorIMG">
                            <img src={img1} alt=''></img>
                        </div>
                    </header>
                    <div className='container'>
                        <div className="container_form">
                            <h3>Iniciar Sesión</h3>
                            {/* <img src={img} alt="imagen de linea de tiempo"/> */}
                            <br />
                            {/* <br /> */}
                            <form className='formulario'>
                                <div className="btnlogin">
                                {
                                    logeado == null ? <GoogleLogin
                                        clientId="1056717193966-him0af1q4ed7csfr3n0iol6cct22qkj5.apps.googleusercontent.com"
                                        buttonText="Continuar con Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        // onClick={handleClick}
                                    /> : null
                                }
                                </div>
                            </form>
                        </div>
                        <div className='imagen_Login'>
                            <img src={img} alt="imagen de linea de tiempo" width='450px'/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default Login;
//.
