import { useContext } from 'react';
import { expenseCategories, incomeCategories, resetCategories } from './constants/categories';
import { ExpenseTrackerContext } from './context/context';

/**
 * @description A hook function
 * the only rule is that it have to start by use
 */

 // if this is all our transaction? 
//  [
//      {id:1 , type: 'Income' , category : 'salary' , amount: 50},
//      {id:1 , type: 'Income' , category : 'salary' , amount: 50},
//      {id:1 , type: 'Expense' , category : 'Bills' , amount: 20},
//      {id:1 , type: 'Income' , category : 'Busness' , amount: 50},
//  ]

 //  transactionsPerType will be this : if we filter by type "Income"

//  [
//      {id:1 , type: 'Income' , category : 'salary' , amount: 50},
//      {id:1 , type: 'Income' , category : 'salary' , amount: 50},
//      {id:1 , type: 'Income' , category : 'Busness' , amount: 50},
//  ]

// total will be 50 + 50 + 50

//categries will be incomeCategories because our title is "Income"
// [
//   { type: 'Business', amount: 0, color: incomeColors[0] },
//   { type: 'Salary', amount: 0, color: incomeColors[1] },
// ]



 const useTransactions = (title) => {

      //reset all our category
      resetCategories()
     // import our transactions from our context
     const {transactions} = useContext(ExpenseTrackerContext)

     // we want to select a transaction based on a title (Income or Expense)
     const transactionsPerType = transactions.filter(t => t.type === title)

     // calculate the total amount
     const total = transactionsPerType.reduce((acc , currentVal) => acc += currentVal.amount , 0)

     // get categories
     const categories = title === 'Income' ? incomeCategories : expenseCategories

    //  console.log("transactionsPerType" , transactionsPerType);
    //  console.log("total" , total);
    //  console.log("categories" , categories);

    transactionsPerType.forEach((t) => {
        // get the category in categories array that match in transactionsPerType
        const category = categories.find((c) => c.type === t.category)

        // increase the amount
        if(category) category.amount += t.amount
    })

    //remove all the category where the amount is 0 in categories
    const filterCategories = categories.filter(c => c.amount > 0)

    // build out chart Data
    const chartData = {

        datasets : [{
            data : filterCategories.map(c => c.amount),
            backgroundColor : filterCategories.map(c => c.color)
        }],
        labels :  filterCategories.map(c => c.type),
    }

    return { total , chartData}
 }

export default useTransactions

