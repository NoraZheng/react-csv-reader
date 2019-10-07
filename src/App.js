import React, { Component } from 'react';
import Header from './Components/Header';
import CSVReader from 'react-csv-reader';
import DisplayData from './Components/DisplayData';
import Footer from './Components/Footer';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}

	handleData = () => {};
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
				<DisplayData />
				<Footer />
			</div>
		);
	}
}

export default App;
