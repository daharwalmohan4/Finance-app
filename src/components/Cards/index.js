import React from "react";
import "./style.css";
import { Row, Card } from "antd";
import Button from "../Button";

function Cards({income,expense,totalBalance,showExpenseModal,showIncomeModal}) {
  console.log(income,expense,totalBalance)
  return (
    <div>
      <Row className="my-row">
        <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>₹{totalBalance}</p>
          <Button blue={true} text={"Reset Balance"} style={{ margin: "0" }}/>
            
        </Card>
        <Card bordered={true} className="my-card">
          <h2>Total Income</h2>

          <p>₹{income}</p>
          <Button blue={true} text="Add Income"  style={{ margin: "0" }} onClick={showIncomeModal}/>
          
        </Card>
        <Card bordered={true} className="my-card">
          <h2>Total Expense</h2>

          <p>₹{expense}</p>
          <Button blue={true} text={"Add Expense"}  style={{ margin: "0" }} onClick={showExpenseModal}/>
           
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
