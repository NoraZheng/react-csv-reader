import React, { Component } from 'react';

class DisplayData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			headers: []
		};
	}

	handleData = data => {
		//the first element is an array of headers like id, names
		const headers = data.shift();
		this.setState({ data: data, headers: headers });
	};

	componentDidMount = () => {
		this.handleData(this.props.data);
	};

	render() {
		return (
			<table>
				<thead>
					<tr>
						{this.state.headers.map((header, index) => {
							return (
								<th id={`header${header}`} key={`header${index}`}>
									{header}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{this.state.data.map(row => {
						return (
							<tr>
								{row.map((value, index) => {
									return (
										<td className={`${this.state.headers[index]}`}>{value}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

export default DisplayData;
