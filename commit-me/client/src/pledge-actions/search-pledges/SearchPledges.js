import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Companies from "../../data/Companies";
import Pledges from "../../data/Pledges";
import Cities from "../../data/Cities";

import CardPledge from "../../pledge-components/card-pledge/CardPledge";
// Import helper functions
import filter from "lodash/filter";
import concat from "lodash/concat";

const Suggestions = props => {
  const options = props.results.map((pledge, i) => (
    <p key={i}>
      {pledge.pledgeId && (
        <>
          <CardPledge pledge={pledge} />
          {props.handleParentPledge && (
          <p className="uk-button uk-button-primary uk-button-small uk-margin-top uk-margin-bottom" onClick={() => {
            props.handleParentPledge(pledge)
          }}>Set parent pledge</p>
          )}
        </>
      )}
      {!pledge.pledgeId && (
        <>
          <CardPledge pledge={pledge} angelPledge={true} />
          {props.handleParentPledge && (
            <p className="uk-button uk-button-primary uk-button-small uk-margin-top uk-margin-bottom" onClick={() => {
              props.handleParentPledge(pledge)
            }}>Set parent pledge</p>
          )}
          
        </>
      )}
    </p>
  ));
  return <ul>{options}</ul>;
};

class Search extends Component {
  state = {
    query: "",
    results: []
  };

  searchForMatch = (listOfPledges, lowerQuery) => {
    let result;
    if (lowerQuery.length < 4) {
      result = filter(
        listOfPledges,
        pledge =>
          lowerQuery === pledge.name.slice(0, lowerQuery.length).toLowerCase()
      );
    } else {
      result = filter(
        listOfPledges,
        pledge =>
          lowerQuery ===
            pledge.name.slice(0, lowerQuery.length).toLowerCase() ||
          pledge.name.toLowerCase().indexOf(lowerQuery) > 5
      );
    }
    return result;
  };

  getInfo = () => {
    const lowerQuery = this.state.query.toLowerCase();
    const filteredPledges = this.searchForMatch(Pledges, lowerQuery);
    const filteredCities = this.searchForMatch(Cities, lowerQuery);
    const filteredCompanies = this.searchForMatch(Companies, lowerQuery);
    const filtered = concat(
      filteredPledges,
      concat(filteredCities, filteredCompanies)
    );
    this.setState({
      results: filtered
    });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          this.getInfo();
        } else {
          this.setState({
            results: []
          });
        }
      }
    );
  };

  render() {
    
    return (
      <>
        <input
          placeholder="Search for companies or cities..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} {...this.props} />
      </>
    );
  }
}

export default Search;
