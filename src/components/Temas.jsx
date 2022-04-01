import React, {useState, useEffect} from "react";
import '../style/Tema.css'
import url from '../keys/backend_keys'
import {BrowserRouter, Link,  NavLink} from 'react-router-dom'
import ListadoLineasDeTiempoTema from './ListadoLineasDeTiempoTema'

const Temas = ({codigo}) => {
    const [datos, setDatos]= useState([]);
    const [buscar, setBuscar] = useState('')

    useEffect(() => {
        fetch(`${url}/api/Tema/ListarTemasUsuario/${codigo}`)
            .then((resp) => resp.json())
            .then((data) => {
                setDatos(data);
            });
    }, []);


    function buscarTema(term){
		return function(x){
			// return x.name.includes(term) || !term
            return (x.Nombre.toString().toLowerCase()).includes(term.toLowerCase()) || !term
		}
	}

    //MODAL PARA AGREGAR TEMA
    const ModalAgregarTema = () => {
        const [temas, setTemas] = useState({});
        const handleChange = (e) => {
            setTemas({
                ...temas,
                [e.target.name]: e.target.value,
            });
        };
        return (
            <>
                <div className="modalAgregarTema">
                    <form className="formTema">
                        <div className="contenedorModalTema">
                            <h3>REGISTRAR TEMA</h3>
                            <div className="formContenidoTema">
                                <p>
                                    <label>Título</label>
                                    <input
                                        type="text"
                                        name='Titulo'
                                        onChange={handleChange}
                                        value={temas.Titulo}
                                    ></input>
                                </p>
                                <p>
                                    <label>Palabras clave</label>
                                    <textarea
                                        rows="2"
                                        cols="50"
                                        placeholder="Palabras clave"
                                        name="PalabrasClave"
                                        style={{resize:'none'}}
                                        onChange={handleChange}
                                        value={temas.PalabrasClave}
                                    ></textarea>
                                </p>
                                <p>
                                    <label>Descripcion</label>
                                    <textarea
                                        rows="3"
                                        cols="50"
                                        placeholder="Descripcion"
                                        name="Descripcion"
                                        style={{resize:'none'}}
                                        onChange={handleChange}
                                        value={temas.Descripcion}
                                    ></textarea>
                                </p>
                                <div className="botonesModalTema">
                                    <button 
                                        className="btnRegistrar"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            // NuevaOrden()
                                            fetch(`${url}/api/Tema/CrearTema`,{
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json',
                                                },
                                                method: 'POST',
                                                body: JSON.stringify({
                                                    temas,
                                                    Nombre: temas.Titulo,
                                                    PalabrasClave: temas.PalabrasClave,
                                                    Descripcion: temas.Descripcion,
                                                    Vigencia: 'A',
                                                    CodigoPersona:codigo
                                                }),
                                            }).then((resp) =>resp.json()).then((data)=>{
                                                if (data.ok) {
                                                    console.log(data.Codigo)
                                                    alert('Se Registró tema correctamente')
                                                    setDatos([
                                                        ...datos,
                                                        {
                                                            codigo:data.Codigo,
                                                            Nombre: temas.Titulo,
                                                            PalabrasClave: temas.PalabrasClave,
                                                            Descripcion: temas.Descripcion,
                                                            Vigencia: 'A',
                                                            CodigoPersona:codigo
                                                        },
                                                    ]);
                                                    setFormTema(false)
                                                }
                                                else{
                                                    alert('El nombre del tema ya existe')
                                                }
                                                
                                            })
                                        }}
                                    >Registrar</button>
                                    <button 
                                        className="btnCancelar"
                                        onClick={() => {setFormTema(false)}}
                                    >Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    const [formTema, setFormTema] = useState(false);
	const onFormTema = () => {
		setFormTema(!formTema);
	};

    return(
        <div className="contenidoTemas">
            <h1>MIS TEMAS</h1>
            <div className="accionesTema">
                <div className="btnTema" onClick={onFormTema}>
                    <i class="fa-regular fa-circle-plus"></i>
                    <p>Tema</p>
                </div>
                {formTema && <ModalAgregarTema/>}
                <div className="buscarTema">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="search"
                        placeholder="Buscar tema"
                        name='buscar'
						onChange={e => setBuscar(e.target.value)}
                        autoComplete="off"
                    >
                    </input>
                </div>
            </div>
            <div className="listadoTemas">
            {
                datos.filter(buscarTema(buscar)).map((item) => {
                    return(
                        <>
                            <div className="tema" key={item.Codigo}>
                                <p>{item.Nombre}</p>
                                <div className="iconosTema">
                                    <button>
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            var rpta = window.confirm("¿Desea dar de baja el tema seleccionado?")
                                            if(rpta){
                                            fetch(`${url}/api/Tema/DarDeBaja/${item.Codigo}`, {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json',
                                                },
                                                method: 'PUT',
                                                body: JSON.stringify({
                                                    ...item,
                                                    Vigencia:'B'
                                                }),
                                            })
                                                .then((resp) => {
                                                    return resp.json();
                                                })
                                                .then((data) => {
                                                    alert('Tema dado de baja')
                                                    setDatos(datos.filter((data)=> data.Codigo !== item.Codigo))
                                                })
                                            }
                                        }}
                                    >
                                        <i class="fa-regular fa-trash-can"></i>
                                    </button>
                                    <button>
                                        
                                        <Link 
                                            to={`LineaDeTiempo/${item.Codigo}`}
                                        >
                                            <i class="fa-regular fa-arrow-up-right-from-square"></i>
                                        </Link>
                                           
                                        {/* <i class="fa-regular fa-arrow-up-right-from-square"></i> */}
                                    </button>
                                    
                                </div>
                            </div>
                        </>
                    )
                }
            )}
            </div>
        </div>
    )
}

export default Temas