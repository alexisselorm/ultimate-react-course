import {createSlice} from '@reduxjs/toolkit';

const initialState={
  balance:0,
  loan:0,
  loanPurpose:"",
  isLoading:false
}

const accountSlice = createSlice({
  name:'account',
  initialState,
  reducers:{
    deposit(state,action){
      state.balance+=action.payload
      state.isLoading=false
    },
    withdraw(state,action){
      state.balance-= action.payload
    },
    requestLoan:{
      prepare(amount,purpose){
        return {
          payload:{
            amount,purpose
          }
        }
      },
      reducer(state,action){
      if(state.loan>0) return;
      state.loan= state.loan + action.payload.amount
      state.loanPurpose= action.payload.purpose
      state.balance= state.balance + action.payload.amount
    }},
    payLoan(state){
      state.loanPurpose=""
      state.balance= state.balance - state.loan
      state.loan= 0
    },
    convertingCurrency(state){
      state.isLoading=true
    }
  }
})

export const {payLoan,requestLoan,withdraw} = accountSlice.actions
export default accountSlice.reducer

export function deposit(amount,currency){
  if (currency==='USD') {
  return {
    type: "account/deposit",
    payload:  amount ,
  }
}
  return async function(dispatch,getState){
    dispatch({type:'account/convertingCurrency'})
    const res = await  fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`)
    const data = await res.json()
    console.log(data);
    const convertedAmount = (amount * data.rates["USD"]).toFixed(2);

    dispatch({type:'account/deposit',payload:convertedAmount})
  }

}



// export default function accountReducer(state=initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading:false
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) {
//         console.warn("You already have an active loan.");
//         return state; // Prevent requesting a new loan if one is already active
        
//       }
//       return {
//         ...state,
//         loan: state.loan + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount
//       };
//     case "account/payloan":
//       console.log(action.payload)
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose:"",
//         balance: state.balance - state.loan,
//       };
//     case 'account/convertingCurrency':
//       return {
//         ...state,isLoading:true
//       }
//     default:
//       return state;
//   }
// }

// export function deposit(amount,currency){
//   if (currency==='USD') {
//   return {
//     type: "account/deposit",
//     payload:  amount ,
//   }
// }
//   return async function(dispatch,getState){
//     dispatch({type:'account/convertingCurrency'})
//     const res = await  fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`)
//     const data = await res.json()
//     console.log(data);
//     const convertedAmount = (amount * data.rates["USD"]).toFixed(2);

//     dispatch({type:'account/deposit',payload:convertedAmount})
//   }

// }

// export function withdraw(amount){
//   return {
//     type: "account/withdraw",
//     payload:  amount ,
//   }
// }

// export function requestLoan(amount, purpose){
//   return {
//     type: "account/requestLoan",
//     payload:  {amount, purpose} ,
//   }
// }

// export function payLoan(amount){
//   return {
//     type: "account/payloan",
//     payload:  amount ,
//   }
// }