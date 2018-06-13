import React, { Component } from 'react';
import LinksList from './LinksList';

import './css/App.css';

class App extends Component {

  constructor () {
    super();
    this.state = {
      search: '',
      searchKey: '',
    };

    this.searchFromUrl = this.searchFromUrl.bind(this);
    this.handleUrlInput = this.handleUrlInput.bind(this);
    this.handleCrawlResponse = this.handleCrawlResponse.bind(this);
  }


  searchFromUrl (e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();

    xhr.onload = this.handleCrawlResponse;
    xhr.open("POST", 'http://backend:8080/crawl', true);
    xhr.send(JSON.stringify({
        url: this.state.search,
    }));
  }


  handleUrlInput (e) {
    e.preventDefault();
    this.setState({search: e.target.value});
  }


  handleCrawlResponse (e) {
    this.setState({searchKey: e.target.responseText});
  }


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

            <form 
              onSubmit={this.searchFromUrl}
              className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3"
            >
              <input type="text" value={this.state.search} onChange={this.handleUrlInput} />
              <input type="submit" value="Crawl!"/>
            </form>

          </div>
        </div>

        <LinksList searchKey={this.state.searchKey} />
        
      </div>
    );
  }
}

export default App;
