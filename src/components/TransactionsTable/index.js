import React, { useState } from "react";
import { Radio, Select, Table } from "antd";
import Input from "../Input";
import "./style.css";

import searchsvg from "../../asset/th.jpg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
// import { Option } from "antd/es/mentions";

function TransactionsTable({ transactions,addTransaction,fetchTransactions }) {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
 let filteredTransactions = transactions.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase()) &&
  (item.type && item.type.includes(typeFilter)) // Check if item.type is defined
);

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function exportCSV(){
    var csv=unparse({
      fields:["name","type","tag","date","amount"],
     data: transactions,
    })
    var blob = new Blob([csv], {type: 'text/csv; charset=utf-8'});
    var url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download="transactions.csv";
    document.body.appendChild(link);
    link.click(); 
    document.body.removeChild(link);
  }
  // function importFromCsv(event){
  //   // event.preventDefault();
  //   try {
  //     parse(event.target.files[0],{
  //       header:true,
  //       complete:async function (results) {
  //         for(const transaction of results.data){
  //           console.log("Transaction", transaction)
  //           const newTransaction = {...transaction,amount:parseFloat(transaction.amount)
  //           }
  //           await addTransaction(newTransaction,true);
  //         }
  //       }
  //     })
  //     toast.success("All transaction added successfully")
  //     fetchTransactions()
  //     event.target.files=null
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }
  function importFromCsv(event) {
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            console.log("Transaction", transaction);
            const newTransaction = { ...transaction, amount: parseFloat(transaction.amount) };
            await addTransaction(newTransaction, true);
          }
        }
      });
      toast.success("All transactions added successfully");
      fetchTransactions();
  
      // Clear the input element's value to allow importing another file
      event.target.value = null;
    } catch (error) {
      toast.error(error.message);
    }
  }
  

  return (
    <>
      <div className="search-container">
        <div className="input-flex">
          <img src={searchsvg} width="16px" alt="img" />
          <input
            placeholder={"Search by Name"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="trans-box">
        <h2>My Transaction</h2>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div className="box">
          <button className="btn" onClick={exportCSV} >Export to CSV</button>
          <label for="file-csv" className="btn-blue btn" onClick={importFromCsv}>Import from CSV</label>
          <input id="file-csv" accept=".csv" required style={{display:"none"}} type="file" onChange={(e)=>importFromCsv(e)}/>
        </div>
      </div>
      <Table dataSource={sortedTransactions} columns={columns} />;
    </>
  );
}

export default TransactionsTable;
