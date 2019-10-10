import React, { Component } from 'react';

class TableHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ascending: true
		};
	}
	toggleOrder = () => {
		this.setState({ ascending: !this.state.ascending });
	};

	render() {
		const { ascending } = this.state;
		const { id, key, column, sortData, content } = this.props;
		return (
			<th>
				<button
					className='tHeader'
					id={id}
					key={key}
					onClick={() => {
						sortData(column, ascending);
						this.toggleOrder();
					}}>
					<span className='visuallyHidden'>
						{ascending ? 'sort in ascending order' : 'sort in descending order'}
					</span>
					{content}
				</button>
			</th>
		);
	}
}

export default TableHeader;
