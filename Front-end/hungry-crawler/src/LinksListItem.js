import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/App.css';


class LinksListItem extends Component {

  render (props) {
    return(
      <li className="list-group-item">{this.props.link}</li>
  )}

};

export default LinksListItem