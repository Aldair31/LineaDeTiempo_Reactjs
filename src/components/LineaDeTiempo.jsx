import React from "react";
import '../style/LineaTiempo.css'
import ReactDOM from 'react-dom';
import Logo from '../img/Logo.png';
import { useState } from "react";
import '../style/Tema.css'

const LineaDeTiempo = () =>{
    const [agregarEvento, setAgregarEvento] = useState(false)
    const [mostrarEventos, setMostrarEventos] = useState(false);
    //REGISTRAR EVENTOS 
    const AgregarEventos = () => {
        setAgregarEvento(!agregarEvento)
    }
    //MOSTRAR EVENTOS
    const MostrarEvento = () => {
		setMostrarEventos(!mostrarEventos);
	};
   
    const ModalAgregarEvento = () => {
        const [eventos, setEventos] = useState({});
        const handleChange = (e) => {
            setEventos({
                ...eventos,
                [e.target.name]: e.target.value,
            });
        };
        return (
            <>
                <div className="modalAgregarTema">
                    <form className="formTema">
                        <div className="contenedorModalTema">
                            <h3>REGISTRAR Eventos</h3>
                            <div className="formContenidoTema">
                                <p>
                                    <label>Fecha del Evento</label>
                                    <input type="date" name="" id=""/>
                                </p>
                                <p>
                                    <label>Título</label>
                                    <input
                                        type="text"
                                        name='Titulo'
                                        onChange={handleChange}
                                        value={eventos.Titulo}
                                    ></input>
                                </p>
                                <p>
                                    <label>Imagen</label>
                                    <button>
                                        <i class="fas fa-file-arrow-up"></i>
                                    </button>
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
                                        value={eventos.Descripcion}
                                    ></textarea>
                                </p>
                                <p>
                                    <label>URL</label>
                                    <input
                                        placeholder="URL"
                                        name="Titulo"
                                        onChange={handleChange}
                                        value={eventos.Descripcion}
                                    ></input>
                                </p>
                                <div className="botonesModalTema">
                                    <button 
                                        className="btnRegistrar"
                                        onClick={(e) => {
                                            // e.preventDefault()
                                            // // NuevaOrden()
                                            // fetch(`${url}/api/createTheme`,{
                                            //     headers: {
                                            //         'Content-Type': 'application/json',
                                            //         'Accept': 'application/json',
                                            //     },
                                            //     method: 'POST',
                                            //     body: JSON.stringify({
                                            //         temas,
                                            //         name: temas.Titulo,
                                            //         keywords: temas.PalabrasClave,
                                            //         description: temas.Descripcion,
                                            //         current: true,
                                            //         codigo:id
                                            //     }),
                                            // }).then((resp) =>resp.json()).then((data)=>{
                                            //     console.log(data)
                                            //     alert('Se Registró tema correctamente')
                                            //     setDatos([
                                            //         ...datos,
                                            //         {
                                            //             id:temas.id,
                                            //             name: temas.Titulo,
                                            //             keywords: temas.PalabrasClave,
                                            //             description: temas.Descripcion,
                                            //             current: true,
                                            //             codigo:id
                                            //         },
                                            //     ]);
                                            // })
                                        }}
                                    >Registrar</button>
                                    <button 
                                        className="btnCancelar"
                                        onClick={() => {setAgregarEvento(false)}}
                                    >Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
    const ModalMostrarEvento = () => {
        
        return (
            <>
                <div className="modalAgregarTema">
                    <form className="formTema">
                        
                        <div className="contenedorModalTema">
                            <h3>EVENTO</h3>
                            <br />
                            <div className="formContenidoTema">
                            '25/01/2022'
                            <br />
                            
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
                            <br />
                            <br />
                            {/* {timelineData.map((data, idx) => (
                                <TimelineItem data={data} key={idx} />
                            ))} */}
                                <div className="botonesModalTema">
                                    <button 
                                        className="btnCancelar"
                                        onClick={() => {setMostrarEventos(false)}}
                                    >Cerrar</button>
                                </div>
                            </div>
                        </div> 
                        
                    </form>
                </div>
            </>
        )
    }
    
    const timelineData = [
        {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sint!',
            date: '25/01/2022',
            category: {
                tag: 'Evento 1',
                color: '#FFDB14'
            },
            link: {
                url: 'https://github.com/florinpop17/app-ideas',
                text: 'Check it out on GitHub'
            }
        },
        {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sint!',
            date: '04/02/2022',
            category: {
                tag: 'Evento 2',
                color: '#e17b77'
            },
            link: {
                url: 'https://florin-pop/blog/2019/03/weekly-coding-challenge/',
                text: 'Check it out here'
            }
        },
        {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sint!',
            date: '07/02/2022',
            category: {
                tag: 'Evento 3',
                color: '#1DA1F2'
            },
            link: {
                url: 'https://twitter.com/florinpop1705',
                text: 'See profile'
            }
        },
        {
            text:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sint!',
            date: '18/02/2022',
            category: {
                tag: 'Evento 4',
                color: '#018f69'
            },
            link: {
                url:
                    'https://medium.freecodecamp.org/how-to-build-a-double-slider-sign-in-and-sign-up-form-6a5d03612a34',
                text: 'Check it out here'
            }
        },
        {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sint!',
            date: '05/03/2022',
            category: {
                tag: 'Evento 5',
                color: '#018f69'
            },
            link: {
                url: 'https://medium.com/@popflorin1705',
                text: 'See profile'
            }
        }
    ]
    


    const TimelineItem = ({ data }) => (
        
       
       <div className="timeline-item">
            <div className="timeline-item-content" onClick={MostrarEvento}>
                
                <span className="tag" style={{ background: data.category.color }}>
                    {data.category.tag}
                </span>
                <time>{data.date}</time>
                <p>{data.text}</p>
               
                
                
                {/* <button onClick={onFormTema} >
                    
                    modalAgregarTema
                </button> */}

                {data.link && (
                <></>
                    
                    // <a
                    //     href={data.link.url}
                    //     target="_blank"
                    //     rel="noopener noreferrer"
                    // >
                    //     {data.link.text}
                    // </a>

                    // <button onClick={setFormTema (true)} >
                    //     {data.link.text}

                    // </button>

                    // <button onClick={onFormTema} >
                    //     {data.link.text}
                    // </button>
                    
                )}
                <span className="circle" />
            </div>
        </div>

   

    );
    
    const Timeline = () =>
        timelineData.length > 0 && (
            <div className="timeline-container">
                {timelineData.map((data, idx) => (
                    <TimelineItem data={data} key={idx} />
                ))}
            </div>
        );
    
    const App = () => <>
        <Timeline />
    </>;
    
    
    return(             
        
        <div>      
            {/* {formTema &&  <ModalAgregarTema/> } */}

            {/* <img src={Logo} alt="" 
                className="LogoLineaTiempo"            
            /> */}
            {/* {formTema &&  <ModalAgregarTema/>} */}
            <div className="tituloybtnEvento">
                <div className="btnEvento" onClick={AgregarEventos}>
                    <i class="fa-regular fa-circle-plus"></i>
                    <p>Evento</p>
                </div>
                <div className="tituloLinea">Linea de Tiempo</div>
                <i class="fas fa-ellipsis"></i>
            </div>
            
            <div id="app">   
                            
                <App />
            </div>  
            {agregarEvento && <ModalAgregarEvento/>}
            {mostrarEventos &&  <ModalMostrarEvento/>} 
        </div>        
    )
}
export default LineaDeTiempo