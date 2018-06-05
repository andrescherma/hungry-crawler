import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    firebase.database().ref('urls').on('value')
    .then(snap => console.log(snap.val()))
    .catch(error => console.log('something gone wrong'));
  }

  render() {
    return (
      <div className="App container-fluid">
        
        <div className="row input-row">
          <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <h1>Hungry Crawler</h1>
          </div>

          <div className="input-box">

            <form className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <input type="text" />
              <input type="submit" value="Crawl!"/>
            </form>

          </div>
        </div>

        <div className="urls-list list-row">
          <ul className="list-group col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <li className="list-group-item">link</li>
            <li className="list-group-item">link</li>
          </ul>
        </div>
        
      </div>
    );
  }
}

export default App;
