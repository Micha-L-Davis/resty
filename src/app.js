import { useEffect, useReducer } from 'react';
import './app.scss';

import axios from "axios";

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from './components/history';

function App() {
  const initialState = {
    data: null,
    requestParams: {},
    history: []
    // back: [],
    // forward: []
  }

  const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'REQUEST':
        if (state.requestParams.url) state.history.push(state.requestParams);
        return { ...state, data: 'Loading...', requestParams: payload }
      case 'RESPONSE':
        return { ...state, data: payload };
      // case 'BACK':
      //   let previous = state.back.shift();
      //   state.forward.unshift(state.requestParams);
      //   return { ...state, data: 'Loading...', requestParams: previous || state.requestParams };
      // case 'FORWARD':
      //   let next = state.forward.shift();
      //   state.back.unshift(state.requestParams);
      //   return { ...state, data: 'Loading...', requestParams: next || state.requestParams };
      default:
        break;
    }
  };

  let [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      axios({
        url: state.requestParams.url,
        method: state.requestParams.method
      }).then((response) => dispatch({ type: 'RESPONSE', payload: { headers: response.headers, data: response.data } }));
    } catch (err) {
      console.log(err);
    }
  }, [state.requestParams]);

  return (
    <>
      <Header />
      {/* <div data-testid="rest-method">Request Method: {state.requestParams.method}</div>
      <div data-testid="request-url">URL: {state.requestParams.url}</div> */}
      <History history={state.history} current={state.requestParams} recall={dispatch} />
      <Form sendRequest={dispatch} />
      <Results data={state.data} />
      <Footer />
    </>
  );
}

export default App;
