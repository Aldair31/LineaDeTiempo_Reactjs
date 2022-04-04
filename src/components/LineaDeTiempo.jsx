import React, {useEffect, useState} from "react"
import {useLocation} from 'react-router-dom'
import { Chrono } from "react-chrono";
import moment from "moment";
import { Form, Formik } from "formik";
import logo from '../img/Logo.png'
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
        const [eventos, setEventos] = useState({
            Titulo: '', 
            Dia: '', 
            Fecha: '',
            Imagen: '',
            Descripcion: '',
            URL: '',
        });
        const handleChangeEventos = (e) => {
            setEventos({
                ...eventos,
                [e.target.name]: e.target.value,
            });
        };

        // console.log("Dia: ", moment(eventos.Fecha).format('MM'))
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
                                <div style={{display: 'flex'}}>
                                    <div className="datosfila" style={{width: '30%'}}>
                                        <label>Día</label>
                                        <input 
                                            type="number" 
                                            name="Dia" 
                                            onChange={handleChangeEventos}
                                            value={eventos.Dia}
                                            autoComplete="off"
                                            min={'1'}
                                            // max={33}
                                            // max={moment(eventos.Fecha).format('MM')===2 ? }
                                        />
                                    </div>
                                    <div className="datosfila" style={{width: '66.5%'}}>
                                        <label>Mes / Año</label>
                                        <input 
                                            type="month" 
                                            name="Fecha" 
                                            onChange={handleChangeEventos}
                                            value={eventos.Fecha}
                                            // max={moment(new Date()).format()}
                                        />
                                    </div>
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
                                    <label>URL (información)</label>
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
                                                Fecha: eventos.Dia!='' ? moment(new Date(`${eventos.Fecha}-${eventos.Dia}`)).format('YYYY-MM-DD') : moment(new Date(`${eventos.Fecha}`)).format('YYYY-MM-DD'),
                                                // Fecha: moment(new Date(`${eventos.Fecha}`)).format('YYYY-MM-DD'),
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
                                            } else{
                                                alert("Asegúrese de completar los campos obligatorios")
                                            }
                                        })

                                    }}
                                >Registrar</button>
                                <button 
                                    className="btnCancelar"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setFormEvento(false)
                                    }}
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
        if(eventosLinea[data].Imagen){
            items.push({
                title: (moment(eventosLinea[data].Fecha).add(1, 'day')).format('DD/MM/YYYY'),
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
        } else{
            items.push({
                title: (moment(eventosLinea[data].Fecha).add(1, 'day')).format('DD/MM/YYYY'),
                cardTitle: eventosLinea[data].Titulo,
                url: eventosLinea[data].URL,
                media: {
                    source: {
                        url:"https://i.ibb.co/qMr5Spz/Logo.png"
                    },
                    type: "IMAGE"
                },
                cardDetailedText: eventosLinea[data].Descripcion,
            })
        }
    }

    //ESTADO PARA SABER SI SE VA A ACTUALIZAR Y CAMBIAR EL MODO DE VISTA DE LA LÍNEA
    const [isActive, setActive] = useState(false)
    const onClickMode = () =>{
        setActive(!isActive);
    }
    
    const itemsOrdenados = items.slice().sort((a, b) => new Date(a.title) - new Date(b.title))
    // useEffect(() => {
    //     const itemsOrdenados = items.slice().sort((a, b) => new Date(a.title) - new Date(b.title))
    // }, [items])

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
                {/* www.google.com */}
                <div className={isActive ? "Horizontal" : "Vertical"}>
                    <Chrono
                        mode={isActive ? 'HORIZONTAL' : 'VERTICAL_ALTERNATING'}
                        items={itemsOrdenados}
                        lineWidth={7}
                        allowDynamicUpdate={true}
                        scrollable={{scrollbar: true}}
                        // slideShow
                        // slideItemDuration={2000}
                        cardHeight={200}
                        hideControls={items.length===0 ? true : false}
                        theme={{
                            primary: "#163C79",
                            secondary: "#5692CE",
                            cardBgColor: "white",
                            cardForeColor: "black",
                            textColor: "green",
                            titleColor: "white",
                        }}
                    />
                </div>
                <div className="modo" onClick={onClickMode}>
                    <i className="fa-light fa-timeline-arrow" style={isActive ? {transform: 'rotate(90deg)'}:null}></i>
                    <button>{isActive ? 'Vertical' : 'Horizontal'}</button>
                </div>
            </div>
        </div>
    )
}

export default LineaDeTiempo