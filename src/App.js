import React, { Component } from 'react';
import request from 'superagent';
import './App.css';
// import throttle from 'lodash.throttle';
import { updateLocalStorageArray, getLocalStorageArray } from './search-utils.js';

var reqInProgress = false;
var searchSuggestionLimit = 5;

const getRecentSearches = () => (
  getLocalStorageArray('sbss').splice(0, searchSuggestionLimit)
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      searchResults: getRecentSearches()
    }
  }

  handleInputTerm = (q) => {
    this.setState((prevState, props) => (
      {q: q}
    ));
    
    // set it in localstorage if available
    updateLocalStorageArray('sbss', {product: q});

    // handle the case where search term is null (show top searches ???)
    if (q) {
      this.getSearchResults(q);
    } else {
      reqInProgress && reqInProgress.abort();
      this.setState({ searchResults: getRecentSearches() });
    }
  }

  getSearchResults(q) {
    if (reqInProgress) {
      console.log(" reqInProgress was set aborting it ");
      reqInProgress.abort();
    }
    reqInProgress = request('https://crossorigin.me/http://developer.myntra.com/search/data/'+q)
    .end((err, resp) => {
      if (err) {
        console.error("An error in response for term", q);
        return;
      }
      reqInProgress = null;
      let x = resp.body.data.results.products || [];
      this.setState({searchResults: x.splice(0, searchSuggestionLimit)});
    })
  }

  render() {
    return (
      <div className="search-box-cont">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            onChange={(e) => {
              this.handleInputTerm(e.target.value)
              }
            }
          />
          {
            this.state.searchResults
            ?
              <div className="search-results-cont"> 
                {
                  this.state.searchResults.map((searchRes, i) => {
                    return (
                      <div className="search-results">
                        {
                          searchRes.product.length > 20 
                          ?  searchRes.product.substr(0, 17) + '...'
                          :  searchRes.product
                        }
                      </div>
                    )
                  }, this)
                }
              </div>
            :
              null
          }
        </div>
        <div className="content"> 
           Some random content on the page 
        </div>
      </div>
    );
  }
}

export default App;
