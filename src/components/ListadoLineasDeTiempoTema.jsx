import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom'
import '../style/Tema.css'
import '../style/ListadoLinea.css'
import url from "../keys/backend_keys";

const ListadoLineasDeTiempoTema = () => {
    const {state} = useLocation()
    const { Codigo, Nombre } = state
    const [lineasTema, setLineasTema] = useState([])
    //MODAL PARA AGREGAR LÍNEA DE TIEMPO
    const ModalAgregarLinea = () => {
        const [lineas, setLineas] = useState({});
        const handleChange = (e) => {
            setLineas({
                ...lineas,
                [e.target.name]: e.target.value,
            });
        };
        return (
            <>
                <div className="modalAgregarTema">
                    <form className="formTema">
                        <div className="contenedorModalTema">
                            <h3>REGISTRAR LÍNEA DE TIEMPO</h3>
                            <div className="formContenidoTema">
                                <p>
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        name='Nombre'
                                        onChange={handleChange}
                                        value={lineas.Nombre}
                                    ></input>
                                </p>
                                <p>
                                    <label>Palabras clave</label>
                                    <textarea
                                        rows="2"
                                        cols="50"
                                        placeholder="Palabras clave"
                                        name="PalabrasClave"
                                        onChange={handleChange}
                                        value={lineas.PalabrasClave}
                                        style={{resize:'none'}}
                                    ></textarea>
                                </p>
                                <p>
                                    <label>Descripcion</label>
                                    <textarea
                                        rows="3"
                                        cols="50"
                                        placeholder="Descripcion"
                                        name="Descripcion"
                                        onChange={handleChange}
                                        value={lineas.Descripcion}
                                        style={{resize:'none'}}
                                    ></textarea>
                                </p>
                                <div className="botonesModalTema">
                                    <button 
                                        className="btnRegistrar"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            fetch(`${url}/api/LineaTiempo/CrearLineaTiempo`,{
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json',
                                                },
                                                method: 'POST',
                                                body: JSON.stringify({
                                                    lineas,
                                                    Nombre: lineas.Nombre,
                                                    PalabrasClave: lineas.PalabrasClave,
                                                    Descripcion: lineas.Descripcion,
                                                    Estado: 'F',
                                                    Vista: 'P',
                                                    CodigoTema: Codigo
                                                }),
                                            }).then((resp) =>resp.json()).then((data)=>{
                                                console.log(data)
                                                if(data.ok){
                                                    alert('Se Registró tema correctamente')
                                                    setLineasTema([
                                                        ...lineasTema,
                                                        {
                                                            Codigo:data.Codigo,
                                                            Nombre: lineas.Nombre,
                                                            PalabrasClave: lineas.PalabrasClave,
                                                            Descripcion: lineas.Descripcion,
                                                            Estado: 'F',
                                                            Vista: 'P',
                                                            CodigoTema: Codigo
                                                        },
                                                    ]);
                                                }
                                            })
                                        }}
                                    >Registrar</button>
                                    <button 
                                        className="btnCancelar"
                                        onClick={() => {setFormLinea(false)}}
                                    >Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    const [formLinea, setFormLinea] = useState(false);
	const onFormLinea = () => {
		setFormLinea(!formLinea);
	};

    const ModalCompartir = ({URL}) => {
        return (
            <>
                <div className="modalCompartirLinea">
                    <form className="formCompartir">
                        <div className="contenedorModalCompartir">
                            <h3>Compartir mediante:</h3>
                            <div className="formContenidoCompartir">
                                <div className="iconosRedesSociales">
                                    <i className="fa-brands fa-facebook" style={{color:'#166FE5'}}></i>
                                    <i className="fa-brands fa-whatsapp" style={{color:'#25D366'}}></i>
                                </div>
                                <p>
                                    <label>URL</label>
                                    <div style={{display:'flex', columnGap:'3%'}}>
                                        <input
                                            type="text"
                                            name='Titulo'
                                            value={URL}
                                            // value="https://www.nombreapp.com/linea/15423"
                                        ></input>
                                        <i className="fa-regular fa-clipboard-check" style={{fontSize:'35px', marginTop:'3%'}} ></i>
                                    </div>
                                </p>
                                <div className="botonesModalCompartir">
                                    <button 
                                        className="btnCancelar"
                                        onClick={() => {setFormCompartir(false)}}
                                    >Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    const [formCompartir, setFormCompartir] = useState(false);
	const onFormCompartir = () => {
		setFormCompartir(!formCompartir);
	};

    useEffect(() => {
        fetch(`${url}/api/LineaTiempo/ListarLineasTema/${Codigo}`)
            .then((resp) => resp.json())
            .then((data) => {
                setLineasTema(data);
            });
    }, [])

    //FUNCIÓN PARA BUSCAR
    const [buscar, setBuscar] = useState('')
    const [paginaActual, setPaginaActual] = useState(0)
    const datosFiltrados = () =>{
        if(buscar.length === 0)
            return lineasTema.slice(paginaActual, paginaActual+5)

        const filtrado = lineasTema.filter(item => (item.Nombre.toLowerCase()).includes(buscar.toLowerCase()))

        return filtrado.slice(paginaActual, paginaActual+5)
    }

    const [pagina, setPagina] = useState(0)
    const paginaSiguiente = () =>{
        if(lineasTema.filter(item => (item.Nombre.toLowerCase()).includes(buscar.toLowerCase())).length > paginaActual + 5){
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
        setBuscar(target.value)
    }

    return(
        <div className="contenidoLineas">
            {/* {
                Nombre ?
                    <h1 style={{textAlign: 'center'}}>{Nombre.toUpperCase()}</h1>
                : null
            } */}
            <div className="accionesListadoLinea">
                <div className="btnLinea" onClick={onFormLinea}>
                    <i className="fa-regular fa-circle-plus"></i>
                    <p>Línea</p>
                </div>
                {formLinea && <ModalAgregarLinea/>}
                {
                    Nombre ?
                        <h1 style={{textAlign: 'center'}}>{Nombre.toUpperCase()}</h1>
                    : null
                }
                <div className="buscarLinea">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="search"
                        placeholder="Buscar Línea"
                        name='buscar'
                        value={buscar}
                        onChange={buscarT}
                        autoComplete="off"
                    >
                    </input>
                </div>
            </div>
            {
                datosFiltrados().map((item) => (
                    <div className="listadoLineas" key={item.Codigo}>
                        <div className="LineaGeneral">
                            <div className="Linea">
                                <p>{item.Nombre}</p>
                                <div className="iconosLinea">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    <i className="fa-regular fa-trash-can"></i>
                                    {/* <Link to={`/Dashboard/Temas/${item.Nombre}`}> */}
                                    <Link to={`LineaTiempo/${item.Codigo}`} state={{Codigo: item.Codigo, Nombre: item.Nombre}}>
                                        <i className="fa-regular fa-arrow-up-right-from-square"></i>
                                    </Link>
                                </div>
                            </div>
                            <i className="fa-regular fa-share-nodes" style={{fontSize:'25px', marginTop:'1%'}} onClick={onFormCompartir}></i>
                            {formCompartir && <ModalCompartir URL={`https://www.macrono.com/linea/${item.Codigo}`}/>}
                        </div>
                    </div>
                ))
            }
            <div className="paginacion">
                <button onClick={paginaAnterior}>
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <p>{pagina+1}</p>
                <button onClick={paginaSiguiente}>
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </div>
    )
}

export default ListadoLineasDeTiempoTema