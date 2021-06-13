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
			csvData: null, // Set to null so other message shows if no data.
			loading: false,
			error: ""
		};
	}
	handleData = data => {
		this.setState({ loading: true, csvData: data }, () => {
			this.setState({ loading: false });
		});
	};

	handleError = () => {
		this.setState({ error: "Something went wrong!" });
	};
	render() {
		const { loading, csvData, error } = this.state;
		// Display data not needed if only show if csvData
		if (loading) return <p>Loading</p>;
		if (error) return <p>{error}</p>;
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
						{error ? (
							<p>{error}</p>
						) : (
							<p>Your CSV data will be displayed here</p>
						)}
						<a href="https://www.stats.govt.nz/assets/Uploads/Household-living-costs-price-indexes/Household-living-costs-price-indexes-March-2021-quarter/Download-data/Household-living-costs-price-indexes-March-2021-quarter-group-facts.csv" download>
							Click here to download a sample .csv file (6.9KB)
						</a>
					</div>
				)}
				<Footer />
			</div>
		);
	}
}
export default App;
