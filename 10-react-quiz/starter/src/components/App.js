import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from './Error'
import Loader from './Loader'
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState={
  questions:[],
  status:'loading',
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secondsRemaining:null
}
const SECONDS_PER_QUESTION = 30

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
        status:'active',
        secondsRemaining: state.questions.length*SECONDS_PER_QUESTION
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
    case 'finish':
      return {...state,status:"finished", highscore: state.points > state.highscore ? state.points : state.highscore}
    case 'reset':
      return {...initialState, highscore:state.highcsore, questions:state.questions, status:"ready"}
    case 'tick':
      return {
        ...state,
        secondsRemaining:state.secondsRemaining-1,
        status:state.secondsRemaining===0 ? "finished" : state.status
      }
      default:
      break;
  }

}

export default function App() {


const [{status,questions,index,answer,points,highscore,secondsRemaining},dispatch]=useReducer(reducer,initialState)

  useEffect(() => {
    fetch("http://localhost:9000/questions")
    .then(res=>res.json())
    .then(data=>dispatch({type:'dataReceived',payload:data}))
    .catch(error=>dispatch({type:'dataFailed'}))
  }, []);

  const numQuestions=questions.length
  const maxPossiblePoints = questions.reduce((prev,curr)=>prev+curr.points,0)

  return (
    <div className="app">
      <Header/>

      <Main>
        {status==="loading" && <Loader/>}
        {status==="error" && <Error/>}
        {status==="ready" && <StartScreen dispatch={dispatch} numQuestions={numQuestions}/>}
        {status==="active" && 
        <>
        <Progress
        index={index}
        numQuestions={numQuestions}
        points={points}
        answer={answer}
        maxPossiblePoints={maxPossiblePoints}
        />
        <Question dispatch={dispatch} answer={answer} question={questions[index]}/>
        <Footer>
        <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
        <NextButton numQuestions={numQuestions} index={index} answer={answer} dispatch={dispatch}/>
        </Footer>
        </>
        }
        {status==="finished" && <FinishScreen dispatch={dispatch} highscore={highscore} points={points} maxPossiblePoints={maxPossiblePoints} />}
      </Main>
      </div>
  );
}