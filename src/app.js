import { useEffect, useState } from 'react';
import './app.scss';

import axios from "axios";

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  const callApi = requestParams => {
    setRequestParams(requestParams);
    setData('Loading...');
  }

  useEffect(() => {
    switch (requestParams.method) {
      case 'get':
        axios.get(requestParams.url)
          .then((response) => setData(response.data));
        break;
      case 'post':
        axios.post(requestParams.url, requestParams.body)
          .then((response) => setData(response.data));
        break;
      case 'put':
        axios.put(requestParams.url, requestParams.body)
          .then((response) => setData(response.data));
        break;
      case 'delete':
        axios.get(requestParams.url)
          .then((response) => setData(response.data));
        break;
      default:
        break;
    }
  }, [requestParams]);

  return (
    <>
      <Header />
      <div data-testid="rest-method">Request Method: {requestParams.method}</div>
      <div data-testid="request-url">URL: {requestParams.url}</div>
      <Form callApi={callApi} />
      <Results data={data} />
      <Footer />
    </>
  );
}

export default App;
