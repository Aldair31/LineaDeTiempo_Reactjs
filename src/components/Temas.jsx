import React, {useState} from "react";
import '../style/Tema.css'

import ListadoLineasDeTiempoTema from './ListadoLineasDeTiempoTema'

const Temas = () => {

    //IR A LISTADO LÍNEAS DE TIEMPO POR TEMA
    // const navigate = useNavigate()
    // const handleClick = () =>{
    //     navigate('ListadoLineasDeTiempoTema')
    // }

    //MODAL PARA AGREGAR TEMA
    const ModalAgregarTema = () => {
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
                                    ></textarea>
                                </p>
                                <div className="botonesModalTema">
                                    <button 
                                        className="btnRegistrar"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            // NuevaOrden()
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
                        name="tema"
                        autoComplete="off"
                    >
                    </input>
                </div>
            </div>
            <div className="listadoTemas">
                <div className="tema">
                    <p>Tema 1</p>
                    <div className="iconosTema">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <i class="fa-regular fa-trash-can"></i>
                        <i class="fa-regular fa-arrow-up-right-from-square"></i>
                    </div>
                </div>
                <div className="tema">
                    <p>Tema 2</p>
                    <div className="iconosTema">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <i class="fa-regular fa-trash-can"></i>
                        <i class="fa-regular fa-arrow-up-right-from-square"></i>
                    </div>
                </div>
                <div className="tema">
                    <p>Tema 3</p>
                    <div className="iconosTema">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <i class="fa-regular fa-trash-can"></i>
                        <i class="fa-regular fa-arrow-up-right-from-square"></i>
                    </div>
                </div>
                <div className="tema">
                    <p>Tema 4</p>
                    <div className="iconosTema">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <i class="fa-regular fa-trash-can"></i>
                        <i class="fa-regular fa-arrow-up-right-from-square"></i>
                    </div>
                </div>
                <div className="tema">
                    <p>Tema 5</p>
                    <div className="iconosTema">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <i class="fa-regular fa-trash-can"></i>
                        <i class="fa-regular fa-arrow-up-right-from-square"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Temas