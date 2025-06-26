import { createStore } from "redux";



const initialState={
  balance:0,
  loan:0,
  loanPurpose:"",
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload.amount,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload.amount,
      };
    case "account/requestLoan":
      if (state.loan > 0) {
        console.warn("You already have an active loan.");
        return state; // Prevent requesting a new loan if one is already active
        
      }
      return {
        ...state,
        loan: state.loan + action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount
      };
    case "account/payloan":
      return {
        ...state,
        loan: 0,
        balance: state.loan - action.payload.amount,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

function deposit(amount){
  return {
    type: "account/deposit",
    payload:  amount ,
  }
}

function withdraw(amount){
  return {
    type: "account/withdraw",
    payload:  amount ,
  }
}

function requestLoan(amount, purpose){
  return {
    type: "account/requestLoan",
    payload:  {amount, purpose} ,
  }
}

function payLoan(amount){
  return {
    type: "account/payloan",
    payload:  amount ,
  }
}