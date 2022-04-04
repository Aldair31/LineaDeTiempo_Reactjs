import React, {useState, useEffect} from "react";
import '../style/Tema.css'
import url from '../keys/backend_keys'
import {BrowserRouter, Link,  NavLink, useLocation} from 'react-router-dom'
import ListadoLineasDeTiempoTema from './ListadoLineasDeTiempoTema'

const Temas = ({codigo}) => {
    const [datos, setDatos]= useState([]);
    const [buscar, setBuscar] = useState('')

    // console.log("Codigo: ", codigo)

    const {state} = useLocation()
    const {Codigo} = state

    console.log("STATE: ", state)

    useEffect(() => {
        fetch(`${url}/api/Tema/ListarTemasUsuario/${Codigo}`)
            .then((resp) => resp.json())
            .then((data) => {
                setDatos(data);
            });
    }, [Codigo]);

    //FUNCIÓN DE PAGINADO Y BÚSQUEDA
    const [paginaActual, setPaginaActual] = useState(0)
    const datosFiltrados = () =>{
        if(buscar.length === 0)
            return datos.slice(paginaActual, paginaActual+5)

        const filtrado = datos.filter(item => (item.Nombre.toLowerCase()).includes(buscar.toLowerCase()))

        return filtrado.slice(paginaActual, paginaActual+5)
    }

    const [pagina, setPagina] = useState(0)
    const paginaSiguiente = () =>{
        if(datos.filter(item => (item.Nombre.toLowerCase()).includes(buscar.toLowerCase())).length > paginaActual + 5){
            setPaginaActual(paginaActual+5)
            setPagina(pagina+1)
        }
    }

    const paginaAnterior = () =>{
        if(paginaActual>0){
            setPaginaActual(paginaActual-5)
            setPagina(pagina-1)
        }
    }

    const buscarT = ({target}) =>{
        setPaginaActual(0)
        setPagina(0)
        setBuscar(target.value)
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
                                                    CodigoUsuario:Codigo
                                                }),
                                            }).then((resp) =>resp.json()).then((data)=>{
                                                if (data.ok) {
                                                    console.log(data.Codigo)
                                                    alert('Se Registró tema correctamente')
                                                    setDatos([
                                                        {
                                                            Codigo:data.Codigo,
                                                            Nombre: temas.Titulo,
                                                            PalabrasClave: temas.PalabrasClave,
                                                            Descripcion: temas.Descripcion,
                                                            Vigencia: 'A',
                                                            CodigoUsuario:Codigo
                                                        },
                                                        ...datos,
                                                    ]);
                                                    setPaginaActual(0)
                                                    setPagina(0)
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
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setFormTema(false)
                                        }}
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
        <>
            <div className="contenidoTemas">
                {/* <h1>MIS TEMAS</h1> */}
                <div className="accionesTema">
                    <div className="btnTema" onClick={onFormTema}>
                        <i className="fa-regular fa-circle-plus"></i>
                        <p>Tema</p>
                    </div>
                    {formTema && <ModalAgregarTema/>}
                    <h1>MIS TEMAS</h1>
                    <div className="buscarTema">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="search"
                            placeholder="Buscar tema"
                            name='buscar'
                            // onChange={e => setBuscar(e.target.value)}
                            value={buscar}
                            onChange={buscarT}
                            autoComplete="off"
                        >
                        </input>
                    </div>
                </div>
                <div className="listadoTemas">
                    {console.log("Datos Filtrados: ", datosFiltrados())}
                    {
                        // datosFiltrados().filter(buscarTema(buscar)).map((item) => {
                        datosFiltrados().map((item) => {
                            return(
                                <div className="tema" key={item.Codigo}>
                                    <p>{item.Nombre}</p>
                                    <div className="iconosTema">
                                        <button>
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                var rpta = window.confirm("¿Desea eliminar el tema seleccionado?")
                                                if(rpta){
                                                fetch(`${url}/api/Tema/DarDeBaja/${item.Codigo}`, {
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Accept': 'application/json',
                                                    },
                                                    method: 'PUT',
                                                })
                                                    .then((resp) => {
                                                        return resp.json();
                                                    })
                                                    .then((data) => {
                                                        alert('Tema eliminado')
                                                        setDatos(datos.filter((data)=> data.Codigo !== item.Codigo))
                                                    })
                                                }
                                            }}
                                        >
                                            <i className="fa-regular fa-trash-can"></i>
                                        </button>
                                        <button>
                                            <Link to={`${item.Nombre}`} state={{Codigo: item.Codigo, Nombre: item.Nombre}}>
                                                <i className="fa-regular fa-arrow-up-right-from-square"></i>
                                            </Link>
                                        </button>
                                        
                                    </div>
                                </div>
                            )
                        }
                    )}                    
                </div>
            </div>
            {
                datosFiltrados().length > 0 ?
                    <div className="paginacionTema">
                        <button onClick={paginaAnterior}>
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                        <p>{pagina+1}</p>
                        <button onClick={paginaSiguiente}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                : null
            }
        </>
    )
}

export default Temas