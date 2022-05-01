import './history.scss';

let History = (props) => {

  // let handleForward = (event) => {
  //   event.preventDefault();

  //   props.traverse({ type: 'FORWARD' });
  // };

  // let handleBack = (event) => {
  //   event.preventDefault();

  //   props.traverse({ type: 'BACK' });
  // };

  let handleRecall = (event) => {
    event.preventDefault();
    let historyIndex = +event.target.id.split('-')[0]
    let payload = props.history[historyIndex];
    props.recall({ type: 'REQUEST', payload: payload })
  }

  return (
    <>
      <div className="history">
        {/* <p onClick={handleBack}>↑</p> */}
        <ul>
          {
            props.history.map((element, index) =>
              <li key={`${index}-${element.method}-${element.url}`} onClick={handleRecall}>{element.method} : {element.url}</li>
            )
          }
        </ul>
        {/* <ul>
          {
            props.forward.map((element, index) =>
            <li id={`${index}-${element.method}-${element.url}`}>◦&nbsp;&nbsp;{element.method} : {element.url}</li>
            )
          }
        </ul> */}
        {/* <p onClick={handleForward}>↓</p> */}
      </div>
      {props.current.method && <p className="current-history">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`◦ ${props.current.method} : ${props.current.url}`} </p>}
    </>
  );
}

export default History;
