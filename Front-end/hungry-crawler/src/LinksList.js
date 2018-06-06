import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/App.css';
import LinksListItem from './LinksListItem';

import firebase from './firebase.js';
class LinksList extends Component {

  constructor(props) {
    super(props);
    this.state = {links: {}};
  };

  /*
  componentDidMount () {
    firebase.database().ref('urls').on('value', function(snap){
      var links = snap.val();
      console.log(links);
      this.setState({
        links: links
      });
    });
  }
  */

  render () {
    return(
      <div className="urls-list list-row">
        <ul className="list-group col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <LinksListItem link='http://teamtreehouse.com' />
        </ul>
      </div>
  )};

};

export default LinksList