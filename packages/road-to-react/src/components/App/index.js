import React, { Component } from 'react';
import axios from 'axios';

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from '../../constants';
import Button from '../Button';
import Search from '../Search';
import Table from '../Table';


import './index.css';
import Loading from '../Loading';
import ButtonWithLoading from '../Button/ButtonWithLoading';

class App extends Component {

  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      searchKey: '',
      results: null,
      error: null,
      isLoading: false,
    }

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }


  fetchSearchTopStories(searchTerm, page=0) {
    this.setState({ isLoading: true });
    axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(result => this._isMounted && this.setSearchTopStories(result.data))
    .catch(error => this._isMounted && this.setState({error}))
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });   
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value});
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({ results: {
      ...results, 
      [searchKey]: {hits: updatedHits, page}}});
  }

  updateSearchTopStoriesState = (hits, page) => (prevState) => {
    const { searchKey, results } = prevState;
      const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
      const updatedHits = [
        ...oldHits,
        ...hits
      ];
      return {
        results: {
          ...results,
          [searchKey]: { hits: updatedHits, page }
        },
        isLoading: false
      };
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    this.setState(this.updateSearchTopStoriesState(hits, page));
  }

  componentDidMount() {
    this._isMounted = true;
    const {searchTerm} = this.state;
    this.setState({ searchKey: searchTerm }); 
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted =  false;
  }

  render() {
    const { searchTerm, results, searchKey, error, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    if (error) {
      return <p>Something went wrong.</p>;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}>
            Search
          </Search>
          {
            list && <Table 
                        list={list}
                        onDismiss={this.onDismiss}/>
          }
        </div>
        <div className="interactions">
          <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            >
            More
          </ButtonWithLoading>
        </div>
      </div>
    )
  }
}

export default App;