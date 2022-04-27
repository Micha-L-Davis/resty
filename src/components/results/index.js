import React from 'react';

let Results = (props) => (
  <section>
    <pre data-testid='result-area'>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
  </section>
);


export default Results;
