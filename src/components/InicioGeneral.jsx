import React from "react";
import '../style/InicioGeneral.css'

const InicioGeneral = () =>{
    return (
        <>
            <div className="contenedorAgregadosRecientes">
                <div className="nombreyBuscarAgregados">
                    <h2>Agregados Recientemente</h2>
                    <div className="buscarAgregados">
                        <input type="search" placeholder="Buscar" autoComplete="off"/>
                        <i className="fas fa-search"></i>
                    </div>
                </div>
                <div className="listadoAgregado">
                    <div className="contenidoAgregado">
                        <h3 className="tituloAgregado">Imperio Inca</h3>
                        <button className="btnVerMas">
                            <i 
                                className="fas fa-external-link-alt">
                            </i>
                        </button>
                    </div>
                    <div className="contenidoAgregado">
                        <h3 className="tituloAgregado">Imperio Inca</h3>
                        <button className="btnVerMas">
                            <i 
                                className="fas fa-external-link-alt">
                            </i>
                        </button>
                    </div>
                    <div className="contenidoAgregado">
                        <h3 className="tituloAgregado">Imperio Inca</h3>
                        <button className="btnVerMas">
                            <i 
                                className="fas fa-external-link-alt">
                            </i>
                        </button>
                    </div>
                    <div className="contenidoAgregado">
                        <h3 className="tituloAgregado">Imperio Inca</h3>
                        <button className="btnVerMas">
                            <i 
                                className="fas fa-external-link-alt">
                            </i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default InicioGeneral; 
