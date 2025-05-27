
import {  useReducer } from "react";



const initialState = {
  balance: 0,
  loan: 0,
  isActive: false
};

// 2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

function reducer(state,action){
  // console.log(state,action);
  switch (action.type) {
    case 'openAccount':
      return {...state, balance:state.balance+action.payload,isActive:true}
  case 'deposit':
    return {...state,balance:state.balance+action.payload}
  case 'withdraw':
    return {...state,balance:state.balance-action.payload}
  case 'requestLoan':
    return {...state, balance: state.balance+action.payload, loan:state.loan + action.payload }
  case 'payLoan':
    return {...state,balance: state.loan===0 ? state.balance : state.balance-action.payload, loan: state.loan ==0 ? state.loan : state.loan - action.payload }  
  case 'closeAccount':
    return (state.balance < 0 || state.balance >0) ? {...state}  :{...initialState}
    default:
      throw new Error("Unknown action");
      
  }
}

export default function App() {

  const [{balance,loan,isActive},dispatch]=useReducer(reducer,initialState)
  // console.log(JSON.stringify(state));
  
  
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({type:'openAccount',payload:50})} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:'deposit',payload:150})} disabled={!isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() =>dispatch({type:'withdraw',payload:50})} disabled={!isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:'requestLoan',payload:5000})} disabled={!isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() =>dispatch({type:'payLoan',payload:5000})} disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:"closeAccount"})} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
