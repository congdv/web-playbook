import React, { Component } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import {SORTS} from '../../constants';

import "./index.css"
import Sort from '../Button/Sort';


const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};


class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    }

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { list, pattern, onDismiss,  } = this.props;
    const { isSortReverse, sortKey } = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
    ? sortedList.reverse()
    : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={largeColumn}>
            <Sort sortKey={'TITLE'} onSort={this.onSort} activeSortKey={sortKey}>
              Title
            </Sort> 
          </span>
          <span style={largeColumn}>
            <Sort sortKey={'AUTHOR'} onSort={this.onSort} activeSortKey={sortKey}>
              Author
            </Sort> 
          </span>
          <span style={largeColumn}>
            <Sort sortKey={'COMMENTS'} onSort={this.onSort} activeSortKey={sortKey}>
              Comments
            </Sort> 
          </span>
          <span style={largeColumn}>
            <Sort sortKey={'POINTS'} onSort={this.onSort} activeSortKey={sortKey}>
              Points
            </Sort> 
          </span>
          <span style={largeColumn}>
            Archive
          </span>
        </div>
        {
          reverseSortedList.map(item => (
            <div key={item.objectID} className="table-row">
              <span style={largeColumn}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span style={largeColumn}>{item.author}</span>
              <span style={largeColumn}>{item.num_comments}</span>
              <span style={largeColumn}>{item.points}</span>
              <span  style={largeColumn}>
                <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
                  Dismiss
                </Button>
              </span>
            </div>
          ))
        }
      </div>
    )
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
}

export default Table;