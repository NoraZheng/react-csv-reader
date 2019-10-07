import React, { Component } from 'react';
import Header from './Components/Header';
import CSVReader from 'react-csv-reader';
import DisplayData from './Components/DisplayData';
import Footer from './Components/Footer';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			csvData: [],
			displayData: false
		};
	}

	handleData = data => {
		this.setState({ csvData: data, displayData: true });
	};
	handleError = () => {
		alert('Something went wrong');
	};
	render() {
		return (
			<div className='App'>
				<Header />
				<CSVReader
					cssClass='csv-reader-input'
					label='Upload a .CSV file'
					onFileLoaded={this.handleData}
					onError={this.handleError}
					inputId='upload'
				/>
				{this.state.displayData ? (
					<DisplayData data={this.state.csvData} />
				) : (
					<p>your CSV will be shown here</p>
				)}
				<Footer />
			</div>
		);
	}
}

export default App;
