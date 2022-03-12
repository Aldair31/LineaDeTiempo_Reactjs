import React from "react";
import '../style/LineaTiempo.css'
import ReactDOM from 'react-dom';
import Logo from '../img/Logo.png';
import { useState } from "react";
import '../style/Tema.css'

const LineaDeTiempo = () =>{

    const [formTema, setFormTema] = useState(false);

    const ModalAgregarTema = () => {
        // const [temas, setTemas] = useState({});
        // const handleChange = (e) => {
            // setTemas({
            //     ...temas,
            //     [e.target.name]: e.target.value,
            // });
        // };
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
                                        // onChange={handleChange}
                                        // value={temas.Titulo}
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
                                        // onChange={handleChange}
                                        // value={temas.PalabrasClave}
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
                                        // onChange={handleChange}
                                        // value={temas.Descripcion}
                                    ></textarea>
                                </p>
                                <div className="botonesModalTema">
                                    <button 
                                        className="btnRegistrar"
                                       
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

    const timelineData = [
        {
            text: 'Started working on the app-ideas repository',
            date: 'February 25 2019',
            category: {
                tag: 'app-ideas',
                color: '#FFDB14'
            },
            link: {
                url: 'https://github.com/florinpop17/app-ideas',
                text: 'Check it out on GitHub'
            }
        },
        {
            text: 'Started the Weekly Coding Challenge program',
            date: 'March 04 2019',
            category: {
                tag: 'blog',
                color: '#e17b77'
            },
            link: {
                url: 'https://florin-pop/blog/2019/03/weekly-coding-challenge/',
                text: 'Check it out here'
            }
        },
        {
            text: 'Got 1.000 followers on Twitter',
            date: 'March 07 2019',
            category: {
                tag: 'twitter',
                color: '#1DA1F2'
            },
            link: {
                url: 'https://twitter.com/florinpop1705',
                text: 'See profile'
            }
        },
        {
            text:
                'I published my first article in the FreeCodeCamp Medium Publication',
            date: 'March 18 2019',
            category: {
                tag: 'medium',
                color: '#018f69'
            },
            link: {
                url:
                    'https://medium.freecodecamp.org/how-to-build-a-double-slider-sign-in-and-sign-up-form-6a5d03612a34',
                text: 'Check it out here'
            }
        },
        {
            text: 'Over 12.000 views in a single day on my Medium posts',
            date: 'April 05 2019',
            category: {
                tag: 'medium',
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
            <div className="timeline-item-content">
                <span className="tag" style={{ background: data.category.color }}>
                    {data.category.tag}
                </span>
                <time>{data.date}</time>
                <p>{data.text}</p>
                {/* {data.link && (
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
                    <>
                    </>
                )} */}
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
            <img src={Logo} alt="" 
                className="LogoLineaTiempo"            
            />
            <div id="app">                

                <App />

            </div>

            {/* <footer>
                <p>
                    Created with <i class="fa fa-heart"></i> by
                    <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
                    - Read about how I created this on my
                    <a target="_blank" href="https://www.florin-pop.com/blog/2019/04/how-to-create-a-timeline-with-react/">blog</a>
                </p>
            </footer> */}                    

        </div>        
    )
}

export default LineaDeTiempo