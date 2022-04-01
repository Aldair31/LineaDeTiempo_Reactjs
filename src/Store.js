import { createStore } from "redux";

const initialState = {
	persona: {
		ok: false,
		codigo:null
	},
};
const reducerPersona = (state = initialState, action) => {
	switch (action.type) {
		case 'PERSONA_CREADO':
			return {
				...state,
				persona: {
					ok: action.persona.ok,
					codigo:action.persona.codigo
				},
			};
		case 'PERSONA_LOGEADO':
			return {
				...state,
				persona: {
					ok: action.persona.ok,
					codigo:action.persona.codigo
				},
			};
		case 'CERRAR_SESION':
			return {
				...state,
				persona: {
					ok: false,
					codigo: null
				},
			};
			
		default:
			return state;
	}
};

export default createStore(reducerPersona);