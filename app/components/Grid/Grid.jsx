import React, { Component } from 'react';
import { array } from 'prop-types';

import './Grid.css';

function GridTpl({ data }) {
	return (
		<table className="grid">
			<thead>
				<tr>
					<th className="gridHead">Name</th>
					<th className="gridHead">Hostname</th>
					<th className="gridHead">Port</th>
					<th className="gridHead">Username</th>
				</tr>
			</thead>
			<tbody>
			{ data.map((cell, i) => 
				<tr key={cell.name} className="gridRow">
					<td className="gridCell">{cell.name}</td>
					<td className="gridCell">{cell.hostname}</td>
					<td className="gridCell">{cell.port}</td>
					<td className="gridCell">{cell.username}</td>
				</tr>
			)}
			</tbody>
		</table>
	);
}

GridTpl.propTypes = {
	data: array.isRequired
};

export default class Grid extends Component {
	static propTypes = {
		data: array.isRequired
	};
	
	state = {
		start: 0,
		end: 100
	};
	
	next(e) {
		e.preventDefault();
		
		if (this.state.end + 100 <= this.props.data.length) {
			this.setState((oldState) => ({ start: oldState.end, end: oldState.end + 100 }));
		}
	}
	
	prev(e) {
		e.preventDefault();
		
		if (this.state.start - 100 >= 0) {
			this.setState((oldState) => ({ start: oldState.start - 100, end: oldState.start }));
		}
	}	
	
	viewPage(start, end) {
		if (this.props.data.length < 100) {
			start = 0;
			end = 100;
		}
		
		return this.props.data.slice(start, end);
	}
	
	render() {
		return (
			<div className="gridComp">
				{ this.props.data.length > 100 && <div className="pagination">
					{ this.state.start > 0 && <a href="#" onClick={this.prev.bind(this)}>Previous</a> } 
					{ this.state.start !== 0 && this.state.end !== this.props.data.length && <span className="separator">|</span> } 
					{ this.state.end < this.props.data.length && <a href="#" onClick={this.next.bind(this)}>Next</a> }
				</div> }
				<GridTpl data={this.viewPage(this.state.start, this.state.end)} />
			</div>
		);
	}
	
}