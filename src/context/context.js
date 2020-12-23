import React , {useReducer , createContext} from 'react'
import contextReducer from "./contextReducer"

const initialState = JSON.parse(localStorage.getItem("transactions")) || []

// create our context
export const ExpenseTrackerContext = createContext(initialState)

// create our Provider , we wrap the entire app with it in index.js
export const Provider = ({children}) => {

    //useReducer is like useState but it manage complex state that have multiple values
    const [transactions, dispatch] = useReducer(contextReducer , initialState)
    

    //Actions Creator
    const deleteTransaction = (id) => {
        dispatch({
            type: "DELETE_TRANSACTION",
            payload : id
        })
    }

     const addTransaction = (transaction) => {
        dispatch({
            type: "ADD_TRANSACTION",
            payload : transaction
        })
    }

    // calculate the balance
    const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

    return (
        <ExpenseTrackerContext.Provider 
        value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}