import { Form, Formik } from "formik";
import { connect } from 'react-redux';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect} from 'react';
import url from '../keys/backend_keys';
import '../style/DatosUsuario.css'

const FormularioDatosUsuario = ({persona}) =>{
    const [usuario, setUsuario]= useState([]);
    const navigate = useNavigate()
    const codigo = persona.codigo
    useEffect(() => {
        fetch(`${url}/api/Persona/BuscarPersona/${codigo}`)
            .then((resp) => resp.json())
            .then((data) => {
                setUsuario(data);
            });
    }, []);
   
    return(
        <>
            <header className="datosUsuario"></header>
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
                            <button className="btnDatosRegistro"
                            onClick={() =>{
                                navigate(`/Dashboard`)
                            }
                            }>
                                Terminar Registro
                            </button>
                        </Form>
                    </Formik>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (state) => ({
	persona: state.persona,
});

export default connect(mapStateToProps)(FormularioDatosUsuario);