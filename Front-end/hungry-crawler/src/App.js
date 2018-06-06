import React, { Component } from 'react';
import LinksList from './LinksList';

import './css/App.css';

class App extends Component {

  render() {
    return (
      <div className="App container-fluid">
        
        <header className="row header-row">
          <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <h1>Hungry Crawler</h1>
          </div>
        </header>

        <div className="row input-row">

          <div className="input-box">

            <form className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <input type="text" />
              <input type="submit" value="Crawl!"/>
            </form>

          </div>
        </div>

        <LinksList />
        
      </div>
    );
  }
}

export default App;
