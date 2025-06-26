const initialStateAccount={
  balance:0,
  loan:0,
  loanPurpose:"",
}

export default function accountReducer(state=initialStateAccount, action) {
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

export function deposit(amount){
  return {
    type: "account/deposit",
    payload:  amount ,
  }
}

export function withdraw(amount){
  return {
    type: "account/withdraw",
    payload:  amount ,
  }
}

export function requestLoan(amount, purpose){
  return {
    type: "account/requestLoan",
    payload:  {amount, purpose} ,
  }
}

export function payLoan(amount){
  return {
    type: "account/payloan",
    payload:  amount ,
  }
}