import React from 'react';

import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
    };
  }

  setRequest = value => this.setState({ requestParams: value });

  setData = value => this.setState({ data: value });

  // callApi = requestParams => {
  //   // mock output
  //   const data = {
  //     count: 2,
  //     results: [
  //       { name: 'fake thing 1', url: 'http://fakethings.com/1' },
  //       { name: 'fake thing 2', url: 'http://fakethings.com/2' },
  //     ],
  //   };
  //   this.setRequest(requestParams);
  //   this.setData(data);
  // }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {this.state.requestParams.method}</div>
        <div>URL: {this.state.requestParams.url}</div>
        <Form setRequest={this.setRequest} setData={this.setData} />
        <Results data={this.state.data} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
