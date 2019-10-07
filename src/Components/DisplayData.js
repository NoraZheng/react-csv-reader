import React, { Component } from 'react';

class DisplayData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: [],
			data: [],
			headers: [],
			pageNum: 1,
			rowsPerPage: 20
		};
	}

	handleData = data => {
		//the first element is an array of headers like id, names
		const headers = data.shift();
		this.setState({ data: data, headers: headers }, () => {
			this.getCurrentPage(this.state.pageNum);
		});
	};

	getCurrentPage = pageNum => {
		//pagination based on the current page number and rows to show per page
		//get a slice of the csv data
		const currentPage = this.state.data.slice(
			(pageNum - 1) * this.state.rowsPerPage,
			pageNum * this.state.rowsPerPage
		);
		this.setState({ currentPage: currentPage, pageNum: pageNum });
	};

	updateRowsPerPage = e => {
		// show only certain number of rows based on user's preference
		let rowsPerPage = e.target.value;
		this.setState({ rowsPerPage: rowsPerPage }, () => {
			this.getCurrentPage(this.state.pageNum);
		});
	};

	componentDidMount = () => {
		this.handleData(this.props.data);
	};

	render() {
		return (
			<section className='data'>
				<label>
					Show
					<select id='rowsPerPage' onChange={this.updateRowsPerPage}>
						<option value='20'>20</option>
						<option value='50'>50</option>
						<option value='100'>100</option>
						<option value='200'>200</option>
					</select>
					rows per page
				</label>

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
						{this.state.currentPage.map(row => {
							return (
								<tr>
									{row.map((value, index) => {
										return (
											<td className={`${this.state.headers[index]}`}>
												{value}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		);
	}
}

export default DisplayData;
