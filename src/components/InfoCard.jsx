import React from 'react'
const isIncome = Math.round(Math.random())
const InfoCard = () => {
    return (
        <div style={{textAlign:"center" , padding: "0 10%"}}>
              Try saying : <br/>
              Add {isIncome? "Income " : "Expense "}
              for {isIncome? "$400 " : "$150 "}
               in category {isIncome? "Busness " : "House "}
               for {isIncome? "Tuesday " : "Friday "}
        </div>
    )
}

export default InfoCard
