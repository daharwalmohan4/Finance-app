import React from 'react'
import "./style.css"

function Input({type,label,state,setSate,placeholder}) {
  return (
    <div className='input-wrapper'>
        <p className='label-input'>{label}</p>
        <input type={type} value={state}
        placeholder={placeholder} onChange={(e)=>setSate(e.target.value)} className='custom-input'  />
    </div>
  )
}

export default Input