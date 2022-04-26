import "./form.scss";

import { useState } from "react";

let Form = (props) => {
  let [method, setMethod] = useState("get");

  let handleSubmit = event => {
    event.preventDefault();
    const formData = {
      method: method,
      url: event.target.url.value,
    };
    props.setData('Loading...')
    props.setRequest(formData)
    //Mock API Data
    const data = {
      count: 2,
      headers: {
        Status: 200,
        Date: "Mon, 27 Jul 2009 12:28:53 GMT",
        Server: "Apache/2.2.14 (Win32)",
        "Last-Modified": "Wed, 22 Jul 2009 19:15:56 GMT",
        "Content-Length": 88,
        "Content-Type": "text/html",
        Connection: "Closed",
      },
      results: [
        { name: 'fake thing 1', url: 'http://fakethings.com/1' },
        { name: 'fake thing 2', url: 'http://fakethings.com/2' },
      ],
    };
    setTimeout(() => props.setData(data), 1500);
  }

  let handleSelectMethod = event => {
    event.preventDefault();
    setMethod(event.target.id);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name="url" type="text" />
          <button type="submit">GO!</button>
        </label>
        {(method === "put" || method === "post") &&
          <label>
            <span>Body: </span>
            <textarea name="body" rows="10" cols="42" />
          </label>
        }
        <label className="methods" onClick={handleSelectMethod}>
          <span id="get" className={method === 'get' ? 'active' : 'inactive'}>GET</span>
          <span id="post" className={method === 'post' ? 'active' : 'inactive'}>POST</span>
          <span id="put" className={method === 'put' ? 'active' : 'inactive'}>PUT</span>
          <span id="delete" className={method === 'delete' ? 'active' : 'inactive'}>DELETE</span>
        </label>
      </form>
    </>
  );

}

export default Form;
