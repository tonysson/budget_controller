/**
 * @description Reducer is a function that takes in the old old state , and action and it returns new State
 * Action specify how do we want to change the state
 */

 const contextReducer = (state , action) => {  

        let transactions ;

        switch(action.type){
            case 'DELETE_TRANSACTION' :
                // delete one transaction
                 transactions = state.filter(t => t.id !== action.payload)
                 // set the newly transactions into the local storage
                 localStorage.setItem("transactions" , JSON.stringify(transactions))
                return transactions
            case 'ADD_TRANSACTION' :
                 transactions = [...state , action.payload]
                  // set the newly transactions into the local storage
                 localStorage.setItem("transactions" , JSON.stringify(transactions))
                return transactions
            default : 
                return state
        }
 }

 export default contextReducer