import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from './Error'
import Loader from './Loader'
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
const initialState={
  questions:[],
  status:'loading',
  index:0,
  answer:null,
  points:0
}

function reducer(state,action){

  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions:action.payload,
        status:'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        status:'error'
      }
    case "start":
      return {
        ...state,
        status:'active'
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer:action.payload,
        points: action.payload === question.correctOption 
        ? state.points + question.points 
        : state.points,
      }
    case 'nextQuestion':
      return {...state, index: state.index+1, answer:null}
    default:
      break;
  }

}

export default function App() {


const [{status,questions,index,answer},dispatch]=useReducer(reducer,initialState)

  useEffect(() => {
    fetch("http://localhost:9000/questions")
    .then(res=>res.json())
    .then(data=>dispatch({type:'dataReceived',payload:data}))
    .catch(error=>dispatch({type:'dataFailed'}))
  }, []);

  const numQuestions=questions.length

  return (
    <div className="app">
      <Header/>

      <Main>
        {status==="loading" && <Loader/>}
        {status==="error" && <Error/>}
        {status==="ready" && <StartScreen dispatch={dispatch} numQuestions={numQuestions}/>}
        {status==="active" && 
        <>
        <Question dispatch={dispatch} answer={answer} question={questions[index]}/>
        <NextButton answer={answer} dispatch={dispatch}/>
        </>
        }
      </Main>
      </div>
  );
}