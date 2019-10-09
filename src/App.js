import React, { Component } from "react";
import Header from "./Components/Header";
import CSVReader from "react-csv-reader";
import DisplayData from "./Components/DisplayData";
import Footer from "./Components/Footer";
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			csvData: null // Set to null so other message shows if no data.
		};
	}

	handleData = data => {
		this.setState({ csvData: data });
	};
	handleError = () => {
		alert("Something went wrong");
	};
	render() {
		// Display data not needed if only show if csvData
		const { csvData } = this.state;
		return (
			<div className="App">
				<Header />
				<CSVReader
					cssClass="csvInput"
					label="Upload a .CSV file"
					onFileLoaded={this.handleData}
					onError={this.handleError}
					inputId="upload"
				/>
				{csvData ? (
					<DisplayData data={csvData} />
				) : (
					<div className="box">
						<p>Your CSV data will be displayed here</p>
					</div>
				)}
				<Footer />
			</div>
		);
	}
}

export default App;
