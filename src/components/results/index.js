import './results.scss';


let Results = (props) => (
  <section className='results'>
    <pre data-testid='result-area'>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
  </section>
);


export default Results;
