import { Form, Formik } from "formik";
import { connect } from 'react-redux';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect} from 'react';
import url from '../keys/backend_keys';
import '../style/DatosUsuario.css'

const FormularioDatosUsuario = ({persona}) =>{
    const navigate = useNavigate()
    const CodigoPersona = persona.codigo

    console.log("Codigo Persona: ", CodigoPersona)

    const [persona1, setPersona] = useState({});
    const handleChangePersona = (e) => {
        setPersona({
            ...persona1,
            [e.target.name]: e.target.value,
        });
    };

    console.log("Codigo País: ", persona1.CodigoPais)
    const [paises, setPaises] = useState([])
    useEffect(() => {
        fetch(`${url}/api/Pais/ListarNombrePaises`)
            .then((resp) => resp.json())
            .then((data) => {
                setPaises(data);
            });
    }, []);

    const [usuario, setUsuario] = useState({});
    const handleChangeUsuario = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

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
                                            <input
                                                type="text"
                                                name='Nombre'
                                                onChange={handleChangePersona}
                                                value={persona1.Nombre}
                                            />
                                        </div>
                                        <div className="dato2">
                                            <label>Apellidos</label>
                                            <input
                                                type="text"
                                                name='Apellidos'
                                                onChange={handleChangePersona}
                                                value={persona1.Apellidos}
                                            />
                                        </div>
                                    </div>
                                    <div className="datosfila2">
                                        <div className="dato3">
                                            <div className="dato3_1">
                                                <label>Fecha de Nacimiento</label>
                                                <input
                                                    type="date"
                                                    name='FechaNacimiento'
                                                    onChange={handleChangePersona}
                                                    value={persona1.FechaNacimiento}
                                                />
                                            </div>
                                            <div className="dato3_2">
                                                <label>Sexo</label>
                                                <select
                                                    name='Sexo'
                                                    onChange={handleChangePersona}
                                                    value={persona1.Sexo}
                                                >
                                                    <option value="M">Masculino</option>
                                                    <option value="F">Femenino</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="dato3">
                                             <div className="dato3_2" style={{marginLeft: '-35px'}}>
                                                <label>País</label>  
                                                <select
                                                    style={{width: '180px'}}
                                                    name='CodigoPais'
                                                    onChange={handleChangePersona}
                                                    value={persona1.CodigoPais}
                                                >
                                                    {
                                                        paises.map((item) => (
                                                            <option key={item.Codigo} value={item.Codigo}>{item.Nombre}</option>
                                                        ))
                                                    }
                                            </select>
                                             </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="datosDeUsuario">
                                <h3>Datos de Usuario</h3>
                                <div className="nombreUsuario">
                                    <label>Nombre de Usuario</label>
                                    <input
                                        type="text"
                                        name='NombreUsuario'
                                        onChange={handleChangeUsuario}
                                        value={usuario.NombreUsuario}
                                    />
                                </div>
                            </div>
                            <button className="btnDatosRegistro"
                                onClick={(e) => {
                                    e.preventDefault()
                                    fetch(`${url}/api/Usuario/CrearUsuario`, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json',
                                        },
                                        method: 'POST',
                                        body: JSON.stringify({
                                            usuario,
                                            NombreUsuario: usuario.NombreUsuario,
                                            Vigencia: 'A',
                                            CodigoPersona: CodigoPersona
                                        }),
                                    })
                                        .then((resp) => resp.json())
                                        .then((data) => {
                                        })
                                    fetch(`${url}/api/Persona/ActualizarPersona/${CodigoPersona}`, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json',
                                        },
                                        method: 'PUT',
                                        body: JSON.stringify({
                                            ...persona1,
                                            Nombre: persona1.Nombre,
                                            Apellidos: persona1.Apellidos,
                                            FechaNacimiento: persona1.FechaNacimiento,
                                            // Sexo: persona1.Sexo,
                                            Sexo: persona1.Sexo==null ? 'M' : persona1.Sexo,
                                            CodigoPais: persona1.CodigoPais==null ? 1 : persona1.Pais
                                        }),
                                    })
                                        .then((resp) =>resp.json())
                                        .then((data) => {
                                            console.log("Data: ", data)
                                            if(data.ok){
                                                alert('datos actualizados')
                                                // navigate('/Dashboard/AgregadosRecientemente', {state: {usuario}})
                                                navigate(`/Dashboard/AgregadasRecientemente`)
                                            }
                                        })

                                }}
                            >
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