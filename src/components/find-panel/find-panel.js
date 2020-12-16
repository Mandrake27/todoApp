import React, { Component } from 'react';
import './find-panel.css';

export default class FindPanel extends Component {
  state = {
    searchString: '',
  }

  onSearchChange = (evt) => {
    const searchString = evt.target.value;
    this.setState(({ searchString }));
    this.props.onSearchChange(searchString);
  }

  render() {
    return (
      <input type="text"
             className="form-control find-input"
             placeholder="type to search"
             onChange={ this.onSearchChange }
             value={ this.state.searchString }
      />
    )
  }
}