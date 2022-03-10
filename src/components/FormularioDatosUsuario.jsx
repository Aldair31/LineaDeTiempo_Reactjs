import { Form, Formik } from "formik";
import React from "react";
import '../style/DatosUsuario.css'

const FormularioDatosUsuario = () =>{
    return(
        <>
            <header className="datosUsuario">
                
            </header>
            <section className="contenedorDatosUsuario">
                <div className="completarDatos">
                    <h2>Completa tus Datos</h2>
                    <Formik
                        initialValues={
                            {}
                        }
                        validate={{}}
                    >
                        <Form className="formularioDatosUsuario">
                            <div className="datosPersonales">
                                <h3>Datos Personales</h3>
                                <div className="datoPersonal">
                                    <div className="datosfila1">
                                        <div className="dato1">
                                            <label>Nombres</label>
                                            <input type="text"/>
                                        </div>
                                        <div className="dato2">
                                            <label>Apellidos</label>
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="datosfila2">
                                        <div className="dato3">
                                            <div className="dato3_1">
                                                <label>Fecha de Nacimiento</label>
                                                <input type="date" name="" id=""/>
                                            </div>
                                            <div className="dato3_2">
                                                <label>Sexo</label>
                                                <select name="sexo">
                                                    <option value="0">Masculino</option>
                                                    <option value="1">Femenino</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="dato4">
                                             <label>País</label>  
                                             <input type="text"/> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="datosDeUsuario">
                                <h3>Datos de Usuario</h3>
                                <div className="nombreUsuario">
                                    <label>Nombre de Usuario</label>
                                    <input type="text" />
                                </div>
                            </div>
                            <button className="btnDatosRegistro">
                                Terminar Registro
                            </button>
                        </Form>

                    </Formik>

                </div>
            </section>
        </>
    )
}

export default FormularioDatosUsuario