import { useEffect, useReducer, useRef } from 'react';
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

  const initialRender = useRef(true);

  const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'REQUEST':
        if (state.requestParams.method) state.history.push(state.requestParams);
        return { ...state, data: 'Loading...', requestParams: payload }
      case 'RESPONSE':
        return { ...state, data: payload };
      default:
        break;
    }
  };

  let [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      axios({
        url: state.requestParams.url,
        method: state.requestParams.method
      })
        .then((response) => dispatch({ type: 'RESPONSE', payload: { headers: response.headers, data: response.data } }))
        .catch((error) => {
          dispatch({ type: 'RESPONSE', payload: { headers: null, data: error } });
        });
    }
  }, [state.requestParams]);

  return (
    <>
      <Header />
      <History history={state.history} current={state.requestParams} recall={dispatch} />
      <Form sendRequest={dispatch} />
      <Results data={state.data} />
      <Footer />
    </>
  );
}

export default App;
