import React from "react";
import { Line, Pie } from "@ant-design/charts";

function Charts({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });
  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });
  const incomeData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "income") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  const config = {
    data: data,
    width: 500,

    autoFit: true,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data: Object.values(spendingData),
    width: 500,
    angleField: "amount",
    colorField: "tag",
  };
  const incomeConfig = {
    data: Object.values(incomeData),
    width: 500,
    angleField: "amount",
    colorField: "tag",
  };
  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});
  let finalIncome = incomeData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  let chart;
  let pieChart;
  let incomePieChart;
  return (
    <>
      <div className="charts-wrapper">
        <div className="chart-boxs chart">
          <h2 style={{ marginTop: "0" }}>Your Analytics</h2>
          <Line
            {...config}
            onReady={(chartInstance) => (chart = chartInstance)}
          />
        </div>
        <div className="chart-boxs pei-chart">
          <h2 style={{ marginTop: "0" }}>Your Spendings</h2>
          <Pie
            {...spendingConfig}
            onReady={(chartInstance) => (pieChart = chartInstance)}
          ></Pie>
        </div>
      </div>
      <div className="lower-box">
        <div className="chart-boxs pei-chart">
          <h2 style={{ marginTop: "0" }}>Your Income</h2>
          <Pie
            {...incomeConfig}
            onReady={(chartInstance) => (incomePieChart = chartInstance)}
          ></Pie>
        </div>
     
      </div>
    </>
  );
}

export default Charts;
