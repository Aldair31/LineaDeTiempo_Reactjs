import { createStore } from "redux";

const initialState = {
	persona: {
		ok: false,
		message: '',
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
					message: action.persona.message,
					codigo:action.persona.codigo
				},
			};
		case 'PERSONA_LOGEADO':
			return {
				...state,
				persona: {
					ok: action.persona.ok,
					message: action.persona.message,
					codigo:action.persona.codigo
				},
			};
		case 'CERRAR_SESION':
			return {
				...state,
				persona: {
					ok: false,
					message: '',
					codigo: null
				},
			};
			
		default:
			return state;
	}
};

export default createStore(reducerPersona);