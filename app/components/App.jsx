import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../store/store';
import { dataGet, dataSucceeded } from '../store/actions/actionCreators';
import Grid from './Grid/Grid';
import { dataUrls } from '../constants';
import { array, func } from 'prop-types';

import './App.css';

export function AppTpl({ dataSelector, data }) { 
	return (
		<div className="container">
			<h1>React/Node/RESTful App</h1>
			<select onChange={dataSelector} className="dataSelect">
				<option value="2">Small data set</option>
				<option value="10000">Large data set</option>
			</select>
			<Grid data={data} />
		</div>
	);
}

AppTpl.propTypes = {
	data: array.isRequired,
	dataSelector: func.isRequired
};

class App extends Component {
	componentWillMount() {
		store.dispatch(dataGet(dataUrls.GRID_DATA + 2));
	}
	
	render() {
		return (
			<AppTpl dataSelector={this.props.dataSelector} data={this.props.data} />
		);
	}
}

App.propTypes = {
	data: array.isRequired,
	dataSelector: func.isRequired
};

function mapStateToProps(store) {
	return {
		data: store.dataReducer.configurations
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		dataSelector: function(e) {
			const num = e.target.value;
			
			dispatch(dataGet(dataUrls.GRID_DATA + num));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);