import React, { Component } from "react";

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

  calcMaxPage = () => {
    //calculating the max page number
    return Math.ceil((this.state.data.length - 1) / this.state.rowsPerPage);
  };

  handleData = data => {

	
    const { data: propsData } = this.props;
    //the first element of data array is an array of headers like id, names
    const headers = data.shift();

    // clean up dirty data, filter out rows with missing data
    const cleanData = propsData.filter(row => {
      return row.length === headers.length;
    });

    // if current page number exceeds the new max page number, go to the new max page

    this.setState({ data: cleanData, headers }, () => {

      const { pageNum } = this.state;
      if (pageNum < this.calcMaxPage()) {
        this.getPage(pageNum);
      } else {
        this.getPage(this.calcMaxPage());
      }
    });
  };

  getPage = pageNum => {

    const { data, rowsPerPage } = this.state;
    //pagination based on the current page number and rows to show per page
    //get a slice of the csv data
    const currentPage = data.slice(
      (pageNum - 1) * rowsPerPage,
      pageNum * rowsPerPage
    );

    this.setState({ currentPage, pageNum });
  };

  sortData = (column, ascending) => {
    const tbody = document.getElementById("tbody");
    const rows = tbody.rows;
    let unsorted = true;
    // loop until no sorting to be done
    while (unsorted) {
      //start by saying no sorting is done:
      unsorted = false;

      //Loop through all tbody rows
      for (let r = 0; r < rows.length - 1; r++) {
        // getting the two values to be compared, one from the current row, one from the next row
        const v1 = rows[r].querySelector(`.${column}`).innerHTML;
        const v2 = rows[r + 1].querySelector(`.${column}`).innerHTML;

        //check if the two rows should switch place, based on sorting order
        //if both values are numbers, compared by numerical value
				//for strings, follow localeCompare() rules
				
        if (
          ascending
            ? !isNaN(parseFloat(v1)) && !isNaN(parseFloat(v2))
              ? parseFloat(v1) > parseFloat(v2)
              : v1 > v2
            : !isNaN(parseFloat(v1)) && !isNaN(parseFloat(v2))
            ? parseFloat(v1) < parseFloat(v2)
            : v1 < v2
        ) {
          // insert the sorted rows to tbody
          tbody.insertBefore(rows[r + 1], rows[r]);
          unsorted = true;
        }
      }
    }
  };

  selectRowsPerPage = e => {
    const { pageNum, headers } = this.state;
    // show only certain number of rows based on user's preference
    let rowsPerPage = e.target.value;

    this.setState({ rowsPerPage }, () => {
      // if current page number exceeds the new max page number, go to the new max page
      if (pageNum < this.calcMaxPage()) {
        this.getPage(pageNum);
      } else {
        this.getPage(this.calcMaxPage());
			}
			//sort by first column by default
      this.sortData(headers[0], true);
    });
  };

  componentDidMount = () => {
    const { data } = this.props;
    this.handleData(data);
  };

  componentDidUpdate(prevProps) {

		const { data } = this.props;
		const { headers } = this.state
    //when new csv file is uploaded
    if (data !== prevProps.data) {
			this.handleData(data);
			//sort by first column by default
      this.sortData(headers[0], true);
    }
  }

  render() {
		const { pageNum, headers, currentPage } = this.state;

    return (
      <section className="data">
        <label>
          Show
          <select id="rowsPerPage" onChange={this.selectRowsPerPage}>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            {/* max set to 200 for sorting performance */}
          </select>
          rows per page
        </label>
        {/* if already at first page, disable prev button */}
        {pageNum === 1 ? (
          <button className="nav" disabled>
            &lt; <span className="visuallyHidden">previous page</span>
          </button>
        ) : (
          <button
            className="nav"
            onClick={() => {
              this.getPage(pageNum - 1);
            }}
          >
            &lt; <span className="visuallyHidden">previous page</span>
          </button>
        )}

        <label htmlFor="pageNum">
          <span className="visuallyHidden">current page</span>
          {pageNum}
        </label>

        {pageNum === this.calcMaxPage() ? (
          <button className="nav" disabled>
            &gt; <span className="visuallyHidden">next page</span>
          </button>
        ) : (
          <button
            className="nav"
            onClick={() => {
              this.getPage(pageNum + 1);
            }}
          >
            &gt; <span className="visuallyHidden">next page</span>
          </button>
        )}
        <div className="scroll">
          <table>
            <thead>
              <tr>
                {headers.map((header, index) => {
                  return (
                    <th
											className="header"
											// remove space
                      id={`header${header.replace(/\s/g, "")}`}
                      key={`header${index}`}
                    >
											{/* replace underscore with space */}
                      {header.replace(/_/g, " ")}
                      <div className="buttons">
                        <button
                          onClick={() => {
                            this.sortData(header.replace(/\s/g, ""), true);
                          }}
                          className="sort"
                        >
                          <span className="visuallyHidden">Ascending</span>▲
                        </button>
                        <button
                          onClick={() => {
                            this.sortData(header.replace(/\s/g, ""), false);
                          }}
                          className="sort"
                        >
                          <span className="visuallyHidden">Descending</span>▼
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody id="tbody">
              {currentPage.map(row => {
                return (
                  <tr>
                    {row.map((value, index) => {
										
                      return (
                        <td className={`${headers[0].replace(/\s/g, "")}`}>
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default DisplayData;
