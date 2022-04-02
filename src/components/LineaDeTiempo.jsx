import React, {useEffect, useState} from "react"
import {useLocation} from 'react-router-dom'
import { Chrono } from "react-chrono";
import moment from "moment";
import { Form, Formik } from "formik";
import url from '../keys/backend_keys';
import '../style/Tema.css'
import '../style/LineaTiempo.css'

const LineaDeTiempo = () => {
    const {state} = useLocation()
    const { Codigo, Nombre } = state

    //PARA OBTENER TODOS LAS EVENTOS DE UNA LÍNEA
    const [eventosLinea, setEventosLinea] = useState([]);

    useEffect(() => {
        fetch(`${url}/api/Evento/ListarEventosLinea/${Codigo}`)
            .then((resp) => {
                return resp.json()
            })
            // .then((data) =>{
            //     setEventosLinea(data)
            // }); 
            .then((data) => {
                setEventosLinea(data)
            });
    }, []);

    const ModalAgregarEvento = () => {
        const [eventos, setEventos] = useState({});
        const handleChangeEventos = (e) => {
            setEventos({
                ...eventos,
                [e.target.name]: e.target.value,
            });
        };

        return (
            <>
                <div className="modalAgregarEvento">
                    <div className="contenedorFormModal">
                        <form className="formularioDatosEvento">
                            <h3 className="tituloForm">EVENTO</h3>
                            <div className="contenidoForm">
                                <div className="datosfila">
                                    <label>Título</label>
                                    <input 
                                        type="text"
                                        name='Titulo'
                                        onChange={handleChangeEventos}
                                        value={eventos.Titulo}
                                    />
                                </div>
                                <div className="datosfila">
                                    <label>Fecha</label>
                                    <input 
                                        type="date" 
                                        name="Fecha" 
                                        onChange={handleChangeEventos}
                                        value={eventos.Fecha}
                                    />
                                </div>
                                <div className="datosfila">
                                    <label>Imagen(URL)</label>
                                    <input 
                                        type="text"
                                        name='Imagen'
                                        onChange={handleChangeEventos}
                                        value={eventos.Imagen}
                                    />
                                </div>
                                <div className="datosfila">
                                    <label>Descripcion</label>
                                    <textarea
                                        rows="3"
                                        cols="50"
                                        placeholder="Descripcion"
                                        name="Descripcion"
                                        style={{resize:'none'}}
                                        onChange={handleChangeEventos}
                                        value={eventos.Descripcion}
                                    >
                                    </textarea>
                                </div>
                                <div className="datosfila">
                                    <label>URL</label>
                                    <input 
                                        type="text"
                                        name='URL'
                                        onChange={handleChangeEventos}
                                        value={eventos.URL}
                                    />
                                </div>
                            </div>
                            <div className="contenidoBotones">
                                <button 
                                    className="btnRegistrar"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        fetch(`${url}/api/Evento/CrearEvento`, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Accept': 'application/json',
                                            },
                                            method: 'POST',
                                            body: JSON.stringify({
                                                eventos,
                                                Titulo: eventos.Titulo,
                                                Descripcion: eventos.Descripcion,
                                                // Fecha: eventos.Fecha,
                                                Fecha: moment(new Date(`${eventos.Fecha}`)).format('YYYY-MM-DD'),
                                                Imagen: eventos.Imagen,
                                                URL: eventos.URL,
                                                Vigencia: 'A',
                                                CodigoLineaTiempo: Codigo,
                                            }),
                                        })
                                        .then((resp) => resp.json())
                                        .then((data) => {
                                            if(data.ok){
                                                alert('Se Registró el Evento correctamente')
                                                // console.log("DATA: ", data)
                                                setEventosLinea([
                                                    ...eventosLinea,
                                                    {
                                                        Codigo:data.Codigo ,
                                                        Titulo: eventos.Titulo,
                                                        Descripcion: eventos.Descripcion,
                                                        Fecha: moment(new Date(`${eventos.Fecha}`)).format(),
                                                        Imagen: eventos.Imagen,
                                                        URL: eventos.URL,
                                                        Vigencia: 'A',
                                                        CodigoLineaTiempo: Codigo,
                                                    },
                                                ]);
                                                setFormEvento(false)
                                                // window.location.reload();
                                            }
                                        })

                                    }}
                                >Registrar</button>
                                <button 
                                    className="btnCancelar"
                                    onClick={() => {setFormEvento(false)}}
                                >Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    const [formEvento, setFormEvento] = useState(false);
	const onFormEvento = () => {
		setFormEvento(!formEvento);
	};

    let items = []

    for(let data in eventosLinea){
        items.push({
            title: moment(eventosLinea[data].Fecha).format('ll'),
            cardTitle: eventosLinea[data].Titulo,
            url: eventosLinea[data].URL,
            media: {
                source: {
                    url:eventosLinea[data].Imagen
                },
                type: "IMAGE"
            },
            cardDetailedText: eventosLinea[data].Descripcion,
        })
    }

    console.log("Tamaño: ", window.screen.width)

    //ESTADO PARA SABER SI SE VA A ACTUALIZAR Y CAMBIAR EL MODO DE LA LÍNEA
    const [isActive, setActive] = useState(false)
    useEffect(() => {
        setActive(window.screen.width)
    }, []);

    return (
        <div className="Contenedor">
            <div className="accionesLinea">
                <div className="btnEvento" onClick={onFormEvento}>
                    <i className="fa-regular fa-circle-plus"></i>
                    <p>Evento</p>
                </div>
                {formEvento && <ModalAgregarEvento/>}
                <h1>{Nombre.toUpperCase()}</h1>
                <button className="masOpciones">
                    <i className="fa-solid fa-circle-ellipsis"></i>
                </button>
            </div>
            <div className="Eventos">
                <div style={{ width: "60%"}}>
                    <Chrono 
                        // mode={isActive>1200 ? "VERTICAL_ALTERNATING" : "HORIZONTAL"}
                        // mode="VERTICAL"
                        items={items}
                        lineWidth={7}
                        // enableOutline={true}
                        allowDynamicUpdate={true}
                        scrollable={{scrollbar: true}}
                        slideShow
                        slideItemDuration={2000}
                        cardHeight={200}
                        hideControls={true}
                        theme={{
                            primary: "#163C79",
                            secondary: "#5692CE",
                            cardBgColor: "white",
                            cardForeColor: "black",
                            textColor: "green",
                            titleColor: "white"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default LineaDeTiempo