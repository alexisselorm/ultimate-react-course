import { useEffect, useReducer } from "react";

const initialState={
  questions:[],
  status:'loading'
}

function reducer(state,action){

  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions:action.payload,
        status:'received'
      }
    case 'dataFailed':
      return {
        ...state,
        status:'failed'
      }
  
    default:
      break;
  }

}

function Main({children}) {

const [state,dispatch]=useReducer(reducer,initialState)

  useEffect(() => {
    fetch("http://localhost:9000/questions")
    .then(res=>res.json())
    .then(data=>dispatch({type:'dataReceived',payload:data}))
    .catch(error=>dispatch({type:'dataFailed'}))
  }, []);

  return (  
    <main className="main">
      {children}
    </main>

  );
}

export default Main;