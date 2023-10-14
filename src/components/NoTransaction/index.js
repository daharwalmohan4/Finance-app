import React from 'react'
import card from "../../asset/transaction.jpg"

function NoTransaction() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",flexDirection:"column",marginBottom:"2rem"}}>
        <img src={card}  style={{width:"400px",margin:"4rem",}} alt="" />
        <p style={{textAlign:"center",fontSize:"1.2rem"}}>You Have no Transaction currently</p>
    </div>
  )
}

export default NoTransaction