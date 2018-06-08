import React, { Component } from 'react';
import LinksListItem from './LinksListItem';

import firebase from './firebase.js';

class LinksList extends Component {

  
  constructor(props) {
    super(props);

    this.state = {};
    this.updateLinks.bind(this);
  }
  
  
  componentWillMount () {
    var searchKey = this.props.searchKey;
    if (searchKey !== '') {
      firebase.database().ref('urls/' + searchKey).on('value',
        snap => this.updateLinks(snap.val())
      );
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {

    if (prevProps.searchKey !== this.props.searcKey){
      firebase.database().ref('urls/' + prevProps.searchKey).off();

      if (this.props.searchKey !== '') {
        firebase.database().ref('urls/' + this.props.searchKey).on('value',
          snap => this.updateLinks(snap.val())
        );
      }
    }
  }


  updateLinks(linksDict) {
    this.setState({links: linksDict});
  }
  
  render () {
    var links = this.state.links || {};

    return(
      <div className="urls-list list-row">
        <ul className="list-group col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          {Object.keys(links).map(key => <LinksListItem link={links[key]} />)}
        </ul>
      </div>
  )};

};

export default LinksList