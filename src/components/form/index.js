import "./form.scss";

import { useState } from "react";


let Form = (props) => {
  let [method, setMethod] = useState("get");

  let handleSubmit = event => {
    event.preventDefault();
    const formData = {
      method: method,
      url: event.target.url.value,
      body: event.target.body ? event.target.body.value : null
    };
    props.sendRequest({ type: 'REQUEST', payload: formData })
  }

  let handleSelectMethod = event => {
    event.preventDefault();
    setMethod(event.target.id);
  }

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="form">
        <label >
          <span>URL: </span>
          <input name="url" type="text" />
          <button type="submit" >GO!</button>
        </label>
        {(method === "put" || method === "post") &&
          <label>
            <span>Body: </span>
            <textarea name="body" rows="10" cols="42" />
          </label>
        }
        <label className="methods" onClick={handleSelectMethod} data-testid="selectMethod">
          <span id="get" className={method === 'get' ? 'active' : 'inactive'}>GET</span>
          <span id="post" className={method === 'post' ? 'active' : 'inactive'} data-testid='post-button'>POST</span>
          <span id="put" className={method === 'put' ? 'active' : 'inactive'}>PUT</span>
          <span id="delete" className={method === 'delete' ? 'active' : 'inactive'}>DELETE</span>
        </label>
      </form>
    </>
  );

}

export default Form;
