// importing modules //
import React from 'react';
// importing components
import DailyStockData from "./DailyStockData"
import SearchData from "./SearchData"
// Stylesheets
import "bulma/css/bulma.min.css";
import './Main.css';

// Creating components //
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isNYSEOpen: {},

      searchInputValue: "",
      searchDropdownOption: "",

      searchQuery: "",
      dropdownQuery: "",
    }
  }

  // custom functions
  checkIsNYSEOpen = () => {
    fetch("https://financialmodelingprep.com/api/v3/is-the-market-open")
      .then(res => res.json())
      .then(data => {
        this.setState({ isNYSEOpen: data });
      })
      .catch(err => {
        if (!this.state.isNYSEOpen) {
          let data = {
            errMessage: "Unable to fetch data. Check internet connect and try again!",
            err
          };
          this.setState({ isNYSEOpen: data });
        }
      });
  }

  // inbuilt functions 
  componentDidMount = this.checkIsNYSEOpen

  // handling input value change
  handleSearchInputChange = (event, target) => {
    let searchValue = event.target.value;

    if (target === "searchInput") {
      this.setState({ searchInputValue: searchValue });
    }
    else if (target === "dropdown") {
      this.setState({ searchDropdownOption: searchValue });
    }
  }

  // handling on click 
  handleOnClick = () => {
    // returning if search input value is blank
    if (this.state.searchInputValue === "") return alert("Input field cannot be empty!");
    else if(this.state.searchDropdownOption === "default" || this.state.searchDropdownOption === "") return alert("Choose a valid option from dropdown!");

    // resetting search input value in state
    this.setState({
      searchQuery: this.state.searchInputValue,
      searchInputValue: "",

      dropdownQuery: this.state.searchDropdownOption,
      // searchDropdownOption: "",
    });
  }

  render() {
    // extracting data into variables from state
    let { isNYSEOpen } = this.state;

    // returning JSX
    return (
      <main>
        <header className="hero is-normal is-bold is-dark margin-bottom">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Stock Prices (Daily update data)
              </h1>
              <h2 className="subtitle">
                Select the desired tab for results:
              </h2>
              <div>

                {
                  (function () {
                    if (isNYSEOpen.errMessage) return (
                      <h3>
                        {isNYSEOpen.errMessage}
                      </h3>
                    );
                    else if (!isNYSEOpen.errMessage) {
                      if (isNYSEOpen.isTheStockMarketOpen === true) return (
                        <h3 className="green-text">
                          The Market is open!
                        </h3>
                      );
                      else if (isNYSEOpen.isTheStockMarketOpen === false) return (
                        <h3 className="red-text">
                          The Market is closed!
                        </h3>
                      );
                    }
                  })()
                }

              </div>
            </div>
          </div>
        </header>

        <DailyStockData />

        <article className="container box">

          <section className="container width-40vw has-text-centered">

            <div className="display-flex">

              <div className="field">
                <div className="control">
                  <input onChange={(event) => this.handleSearchInputChange(event, "searchInput")} value={this.state.searchInputValue} className="input" type="text" placeholder="Search Ticker..." />
                </div>
              </div>

              <div className="select">
                <select onChange={(event) => this.handleSearchInputChange(event, "dropdown")}>
                  <option value="default">Select dropdown</option>
                  <option value="cc">Crypto-Currencies</option>
                  <option></option>
                </select>
              </div>

            </div>

            <a onClick={() => this.handleOnClick()} className="button is-link margin-bottom">
              Search
            </a>

          </section>

          {
            this.state.searchQuery && this.state.dropdownQuery && this.state.dropdownQuery !== "default" ? <SearchData query={{search: this.state.searchQuery, type: this.state.dropdownQuery}} /> : ""
          }

        </article>

        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Stock Prices</strong> by <a href="https://sg24.github.io">SG</a>. The source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The website content
              uses <a href="https://financialmodelingprep.com">Finacial Modelling APIs</a>.
            </p>
          </div>
        </footer>
      </main>
    );
  }
}

// exporting component //
export default App;
