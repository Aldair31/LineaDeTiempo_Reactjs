import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard'
import General from '../components/General'
import Acceso from './Acceso';

const RootComponent = ({ persona }) => {
	return <>{persona.codigo ? <Dashboard /> : <General />}</>;
};

const mapStateToProps = (state) => ({
	persona: state.persona,
});

export default connect(mapStateToProps)(RootComponent);