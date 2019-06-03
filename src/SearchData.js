// importing modules //
import React from "react";
// Stylesheets
import "bulma/css/bulma.min.css";
import './Main.css';
// import uuidv4 from "uuid/v4";

// Declaring global constants and variables
const TYPES = [
  {
    head: "Crypto-Currencies",
    type: "cc",
    url: "https://financialmodelingprep.com/api/cryptocurrency/",  // ?datatype=json
  },

];

// Creating components //
class SearchData extends React.Component {
  constructor() {
    super();
    this.state = {
      activeData: {},
    }
    this.searchQuery = "";
  }

  fetchData = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({activeData: data}))
      .catch(err => {
        this.setState({activeData: {
          errMessage: "Unable to fetch data. Check internet and try again!",
          err,
        }})
      });
  }

  constructURL = () => {
    let index = null;

    TYPES.forEach((val, ind) => {
      if(val.type === this.props.query.type) index = ind;
    });

    let urlConstruct = TYPES[index].url + this.props.query.search + "?datatype=json";

    this.searchQuery = this.props.query;

    this.fetchData(urlConstruct);
  }

  componentDidMount = this.constructURL;

  componentDidUpdate = () => {
    if(this.searchQuery.type != this.props.query.type || this.searchQuery.search != this.props.query.search) {
      this.constructURL();
    }
  }

  render() {
    return (
      <section>
        {JSON.stringify(this.props.query)}

        {
          JSON.stringify(this.state.activeData)
        }

      </section>
    );
  }
}

// Function components
function CCComponent(){
  return (0);
}

// exporting components //
export default SearchData;
