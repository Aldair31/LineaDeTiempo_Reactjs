import React from 'react';
import { useEffect,useState } from 'react';
import '../style/Themes.css';
// import { Link } from 'react-router-dom';
import { BrowserRouter,Routes, Route, NavLink } from 'react-router-dom';
import LineaDeTiempo from './LineaDeTiempo';
import url from '../keys/backend_keys';

const Themes = ({id})=>{
    const [datos, setDatos]= useState([]);
    const [isActive, setActive] = useState(false); 
    const [eliminar, setEliminar]= useState(false)
    const [dataItem, setDataItem] = useState({})
    const [modal, setModal] = useState(false)
    const [buscar, setBuscar] = useState('')
    function buscarTema(term){
		return function(x){
			// return x.name.includes(term) || !term
            return (x.name.toString().toLowerCase()).includes(term.toLowerCase()) || !term
		}
	}
    useEffect(() => {
        fetch(`${url}/api/listTheme`)
            .then((resp) => resp.json())
            .then((data) => {
                setDatos(data);
            });
    }, []);
    
    
    const ModalAgregarTemas = () =>{
        
        const [temas, setTemas] = useState({});
        const handleChange = (e) => {
            setTemas({
                ...temas,
                [e.target.name]: e.target.value,
            });
        };
        const FormThemes = (dato) => {
            // datos.map((datos) => {
            if(isActive){
               
                    fetch(`${url}/api/editTheme/${dato.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        method: 'PUT',
                        body: JSON.stringify({
                            ...temas,
                            name: datos.nombre,
                            keywords: datos.palabrasClaves,
                            description: datos.descripcion,
                            current: true,
                            codigo:id
                        })
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                      
                        alert('Tema Actualizado')
                        // setTemas([
                            // name: '',
                            // keywords: '',
                            // description:'',
                            // current: true,
                            // datos.map((datos) => {
                            //     name:datos.,
                            //     keywords: '',
                            //     description:'',
                            //     current: true,
                            // })
                            datos.map((datos) => {
                                console.log(datos)
                            setTemas({
                                name: datos.nombre,
                                keywords: datos.palabrasClaves,
                                description: datos.descripcion,
                                current: true,
                            })})
                                // datos.map((datos) => {
    
                                //     if(datos.id == dato.id){
                                //         datos.name = temas.name
                                //         datos.keywords =temas.keywords
                                //         datos.description = temas.description
                                //     }
                                // })
                                
                                // datos.map((datos) => {
                                //             if(datos.id == dato.id){
                                //                 datos.name = temas.name
                                //                 datos.keywords =temas.keywords
                                //                 datos.description = temas.description
                                //             }
                                //         })
                                // ])
                        // ])
                        // setDatos([
                        //     datos.map((datos) => {
                        //         if(datos.id == dato.id){
                        //             datos.name = temas.name
                        //             datos.keywords =temas.keywords
                        //             datos.description = temas.description
                        //         }
                        //     })
                        // ])
                        // setDatos([
                        //     ...datos
                        // ])
                        setActive(!isActive)
                        
                    })
                
                
            } else {
                fetch(`${url}/api/createTheme`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    temas,
                    name: temas.nombre,
                    keywords: temas.palabrasClaves,
                    description: temas.descripcion,
                    current: true,
                    codigo:id
                }),
            }).then((resp) =>resp.json()).then((data)=>{
                console.log(data)
                console.log(dato)
                alert('Se Registró tema correctamente')
                setTemas({
                    name: '',
                    keywords: '',
                    description:'',
                    current: true,
                })
                setDatos([
                    ...datos,
                    {
                        id:temas.id,
                        name: temas.nombre,
                        keywords: temas.palabrasClaves,
                        description: temas.descripcion,
                        current: true,
                        codigo:id
                    },
                ]);
            })
                .catch((err) => {
                    console.log(err);
                });
            }   
        }
        
        return (
            <>
                <div >
                        
                        <div
                         style={{
                            background: '#00000039',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            height: '100vh',
                            width: '100%',
                            zIndex:'1',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <div style={{
                            marginTop:'-35px',
                            width:'40%',
                            background: '#ffffff',
                            padding: '2px',
                            borderRadius: '6px',
                        }}>
                            <div style={{width:'100%', marginLeft:'3.5%'}}>
                                <div className='formThemes'>
                                    <h3>
                                        TEMAS
                                    </h3>
                                    <div className='formularioModal'>
                                        <p>
                                            <label>Nombre:  </label>
                                            <input
                                            type='text'
                                            name='nombre'
                                            placeholder="Nombre"
                                           
                                            value={temas.nombre}
                                            onChange={handleChange}
                                        />
                                        </p>
                                        <p>
                                            <label>Palabras claves:  </label>
                                            <textarea
                                                rows="3"
                                                cols="50"
                                                placeholder="Palabras Claves"
                                                name="palabrasClaves"
                                                
                                                value={temas.palabrasClaves}
                                                onChange={handleChange}
                                                style={{resize:'none'}}
                                            ></textarea>
                                        </p>
                                        <p>
                                            <label>Descripción</label>
                                            <textarea
                                                rows="3"
                                                cols="50"
                                                placeholder="Descripción"
                                                name="descripcion"
                                                
                                                value={temas.descripcion}
                                                onChange={handleChange}
                                                style={{resize:'none'}}
                                            ></textarea>
                                        </p>
                                        <button className='enviarThemes' onClick={() => FormThemes(dataItem)}>{isActive ? 'ACTUALIZAR TEMA' : 'AGREGAR'}</button>
                                     </div>
                                     <div className={isActive ? 'buttonEnabled': 'buttonDisabled'}>
                                    {/* <button 
                                        disabled={isActive?false:true} 
                                        onClick={() => {
                                            setActive(!isActive)
                                            setTemas({
                                                name: '',
                                                keywords: '',
                                                description:'',
                                                current: true,
                                            })
                                        }}>
                                        <i className="fas fa-times"></i>
                                    </button> */}
                                    </div>
                                </div>
                            </div> 
                        </div>
                                
                        
                            <button
                            // disabled={isActive?true:false} 
                            onClick={() => {
                                setActive(!isActive)
                                setModal(false);
                            }}
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                border: 'none',
                                padding: '18px',
                                cursor: 'pointer',
                            }}
                            >
                                <i
                                    className="fas fa-times"
                                    style={{ fontSize: '19px' }}
                                ></i>
                            </button>
                        </div>
                    </div>
            </>
        )
    
    }
    // const FormThemes = () => {
    //     const handleChange = (e) => {
    //      const [temas, setTemas] = useState({});
    //        setTemas({
    //             ...temas,
    //             [e.target.name]: e.target.value,
    //         });
    //     };
    //     return(
    //         <>
    //         <div>
    //             <form
    //             style={{
    //                 background: '#ffffff',
    //                 padding: '2px',
    //                 borderRadius: '6px',
    //             }}
    //             >
    //                 <div className='formThemes'>
    //                     <h3>
    //                         AGREGAR TEMAS
    //                     </h3>
    //                     <div className='formularioModal'>
    //                     <p>
    //                         <label>Nombre:  </label>
    //                         <input
    //                             type='text'
    //                             name='nombre'
    //                             placeholder="Nombre"
    //                             onChange={handleChange}
    //                             value={temas.nombre}
    //                         />
    //                     </p>
    //                     <p>
    //                         <label>Palabras claves:  </label>
    //                         <textarea
    //                             rows="3"
    //                             cols="50"
    //                             placeholder="Palabras Claves"
    //                             name="palabrasClaves"
    //                             onChange={handleChange}
    //                             value={temas.palabrasClaves}
    //                             style={{resize:'none'}}
    //                         ></textarea>
    //                     </p>
    //                     <p>
    //                         <label>Descripción</label>
    //                         <textarea
    //                             rows="3"
    //                             cols="50"
    //                             placeholder="Descripción"
    //                             name="descripcion"
    //                             onChange={handleChange}
    //                             value={temas.descripcion}
    //                             style={{resize:'none'}}
    //                         ></textarea>
    //                     </p>
    //                     <p>
    //                         <button className='enviarThemes'
    //                         onClick={(e) => {
    //                             e.preventDefault();
                                
    //                             fetch(`${url}/api/createTheme`,{
    //                                 headers: {
    //                                     'Content-Type': 'application/json',
    //                                     'Accept': 'application/json',
    //                                 },
    //                                 method: 'POST',
    //                                 body: JSON.stringify({
    //                                     temas,
    //                                     name: temas.nombre,
    //                                     keywords: temas.palabrasClaves,
    //                                     description: temas.descripcion,
    //                                     current: true,
    //                                     codigo:id
    //                                 }),
    //                             }).then((resp) =>resp.json()).then((data)=>{
    //                                 console.log(data)
    //                                 alert('Se Registró tema correctamente')
    //                                 setDatos([
    //                                     ...datos,
    //                                     {
    //                                         id:temas.id,
    //                                         name: temas.nombre,
    //                                         keywords: temas.palabrasClaves,
    //                                         description: temas.descripcion,
    //                                         current: true,
    //                                         codigo:id
    //                                     },
    //                                 ]);
    //                             })
    //                         }}
    //                         >Aceptar</button>
    //                     </p> 
    //                     </div>
    //                 </div>
    //                 <br />
    //             </form>
    //         </div>
    //         </>
    //     )
    // }
    
    // const ModalAgregarTemas = () =>{
    //     const [modal, setModal] = useState(false)
    //     return (
    //         <>
    //             <div >
    //                     {modal ? (
    //                     <>
    //                     <div
    //                      style={{
    //                         background: '#00000039',
    //                         position: 'absolute',
    //                         top: '0',
    //                         left: '0',
    //                         height: '100vh',
    //                         width: '100%',
    //                         zIndex:'1',
    //                         display: 'flex',
    //                         justifyContent: 'center',
    //                         alignItems: 'center',
    //                     }}>
    //                         <div style={{
    //                         marginTop:'-35px',
    //                         width:'40%',
    //                         background: '#ffffff',
    //                         padding: '2px',
    //                         borderRadius: '6px',
    //                     }}>
    //                         <div style={{width:'100%', marginLeft:'3.5%'}}>
                                
    //                             <FormThemes/>
                            
    //                         </div>
                            
    //                         </div>
                            
                        
    //                         <button
    //                         onClick={() => {
    //                             setModal(false);
    //                         }}
    //                         style={{
    //                             position: 'absolute',
    //                             top: '0',
    //                             right: '0',
    //                             border: 'none',
    //                             padding: '18px',
    //                             cursor: 'pointer',
    //                         }}
    //                         >
    //                             <i
    //                                 className="fas fa-times"
    //                                 style={{ fontSize: '19px' }}
    //                             ></i>
    //                         </button>
    //                     </div>
    //                     </>): null}   
    //                 </div>
    
    //                 {/* <br /> */}
    //                 <div>
    //                     <button
    //                         onClick={() => {
    //                             setModal(true);
    //                         }}
    //                         style={{
    //                             border:'0',
    //                             fontSize: '16px',
    //                             cursor: 'pointer',
    //                             color: 'crimson',
    //                             backgroundColor:'transparent',
    //                             textDecoration:'underline'
    //                         }}
    //                     >
    //                         <strong style={{fontSize:'40px'}}><i className="fas fa-plus-circle"></i></strong> 
                            
    //                     </button>
    //             </div>
    //         </>
    //     )
    
    // }
    const ModalEliminarTemas = ()=>{
        return (
           <>
             <div >
                {eliminar ? (
                <>
                <div
                    style={{
                    background: '#00000039',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    height: '100vh',
                    width: '100%',
                    zIndex:'1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <form
                        style={{
                            background: '#ffffff',
                            padding: '2px',
                            borderRadius: '6px',
                        }}
                        onSubmit={(e) => {
                            
                            e.preventDefault();
                            
                            fetch(`${url}/deleteTheme/${datos.id}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                method: 'DELETE',
                            })
                                .then((resp) => {
                                    return resp.json();
                                })
                                .then((data) => {
                                    alert('Tema eliminado')
                                })
                                // .then(() => {
                                //     setRes(res.filter((item) => item._id !== dataRes._id));
                                // });
                                // setEliminar(false)
                    
                        
                        }}
                    >
                        <div className='temaEliminar'>
                            <div className='formularioModalEliminar'>
                                <p className='textoEliminar'>
                                    <b>¿DESEA ELIMINAR RESERVA?</b>
                                    {/* {idTema} */}
                                </p>
                                <div className='eliminar'>
                                    <button type='submit'> 
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <button onClick={() => {
                                        setEliminar(false);
                                    }}>
                                        <i className="fas fa-window-close"></i>
                                    </button>
                                </div> 
                            </div>
                        </div>
                        <br />
                    </form>
                </div>
                </>): null}   
            </div>

                {/* <br /> */}
            <div>
                <button
                    onClick={() => {
                        setEliminar(true);
                    }}
                    style={{
                        border:'0',
                        fontSize: '16px',
                        cursor: 'pointer',
                        color: 'crimson',
                        backgroundColor:'transparent',
                        textDecoration:'underline'
                    }}
                >
                     <p className="eliminar"><button>Eliminar</button></p>

                    {/* <strong style={{fontSize:'40px'}}><i className="fas fa-plus-circle"></i></strong>  */}
                    
                </button>
            </div>
           </>
        )
    }
    return(
        <>
            {/* {eliminar && <ModalEliminarTemas/>} */}
            {modal && <ModalAgregarTemas/>}
            <div className='AgregarYBuscar'>
                {/* <h2 style={{color:'#FFF'}}>Temas</h2> */}
                {/* <ModalAgregarTemas/> */}
                <div className='btnAgregarTema'>
                    <button className='AgregarTema'
                        onClick={() => {
                            setModal(true);
                        }}
                        style={{
                            border:'0',
                            // fontSize: '16px',
                            cursor: 'pointer',
                            color: 'crimson',
                            backgroundColor:'transparent',
                            // textDecoration:'underline'
                        }}
                    >
                        <p>Temas</p>
                        <i className="fas fa-plus-circle"></i>
                        
                    </button>
                </div>
                <div className='btnBuscarTema'>
					<i className="fas fa-search"></i>
					<input 
						type="search" 
                        className='buscarTema'
						placeholder='Buscar por nombre'
						name='buscar'
						onChange={e => setBuscar(e.target.value)}
						autoComplete='off'
					>
					</input>
				</div>
            </div>
            <div className="temas">
                    {
                        datos.filter(buscarTema(buscar)).map((item) => {
                            return(
                                <>
                                    <div className='tema'>
                                        <h3>Nombre: {item.name}</h3>
                                        {/* {item.id} */}
                                        <div className="tema_info">
                                            <p>Palabras Claves: {item.keywords}</p>
                                            <p>Descripcion: {item.description}</p>
                                            <div className='barra_btn'>
                                                <div className='iconos_btn'>
                                                    <p className="btn_eliminar"><button
                                                        onClick={(e)=>{
                                                            e.preventDefault()
                                                            var rpta = window.confirm("¿Desea eliminar el tema seleccionado?")
                                                            if(rpta){
                                                            fetch(`${url}/api/deleteTheme/${item.id}`, {
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'Accept': 'application/json',
                                                                },
                                                                method: 'DELETE',
                                                            })
                                                                .then((resp) => {
                                                                    return resp.json();
                                                                })
                                                                .then((data) => {
                                                                    alert('Tema eliminado')
                                                                    setDatos(datos.filter((data)=> data.id !== item.id))
                                                                })
                                                            }
                                                        }}
                                                    ><i className="fas fa-trash-alt"></i></button></p>
                                                    <p className='btn_editar'>
                                                        <button 
                                                            style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setModal(true)
                                                                setDataItem(item)
                                                                // setTemas({
                                                                //     name: item.nombre,
                                                                //     keywords: item.palabrasClaves,
                                                                //     description: temas.descripcion,
                                                                //     current: true,
                                                                // })
                                                                // if(!isActive){
                                                                //     setActive(!isActive)
                                                                // }
                                                                // setDataItem(item)
                                                            }}
                                                            >
                                                            <i className="fas fa-pen"></i>
                                                        </button>   
                                                    </p>
                                                </div>
                                                <div className='icono_vermas'>
                                                    <p className="btn_vermas">
                                                        <>
                                                            <BrowserRouter>
                                                                <NavLink
                                                                    to={`/LineaDeTiempo/${item.id}`}
                                                                >
                                                                    <i className="fas fa-external-link-alt"></i>
                                                                </NavLink>
                                                                {/* <Routes>
                                                                    <Route
                                                                        path='/LineaDeTiempo/:id'
                                                                        element={<LineaDeTiempo/>}
                                                                    />
                                                                </Routes> */}
                                                                
                                                            
                                                            </BrowserRouter>
                                                        </>
                                                        
                                                        
                                                        
                                                    </p>
                                                </div>

                                            </div>
                                            
                                             
                                            {/* <ModalEliminarTemas/> */}
                                            
                                        </div>
                                    </div>
                                </>
                            );
					})}
			</div>
        </>
    )

}

export default Themes;