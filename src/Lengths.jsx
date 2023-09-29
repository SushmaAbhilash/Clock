import React from 'react'
import './App.css';

function Lengths({title, changeTime, type, time, formatTime,id,increment,decrement,len}) {
  return (
    <div>
      <h4 id={id}>{title}</h4>
      <div className='time-sets'>
        <button className='btn-small deep-purple lighten-2'
        onClick={()=>changeTime(-60, type)}>
          <i className='material-icons' id={decrement}>arrow_downward</i>
        </button>
        <h3 id={len}>{time}</h3>
        <button className='btn-small deep-purple lighten-2'
        onClick={() => changeTime(60, type)}>
          <i className='material-icons' id = {increment}>arrow_upward</i>
        </button>
      </div>
    </div>
  )
}

export default Lengths