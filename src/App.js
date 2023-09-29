import Lengths from './Lengths';
import { useState } from 'react';
import './App.css';


function App() {

  const [displayTime, setDisplayTime] = useState(25*60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn,setTimerOn] = useState(false);
  const [onBreak,setOnBreak] = useState(false);
  const [breakAudio, setBreakAudio] = useState(new Audio("./Beep.mp3"));
  
  const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);  
  }

  const changeTime = (amount, type) => {
    if(type === 'break'){
      if(breakTime <= 60 && amount < 0 || (breakTime >= 60 * 60 && amount > 0)){
        return;
      }
      setBreakTime(prev => prev + amount);
    }
    else{
      if(sessionTime <= 60 && amount < 0 || (sessionTime >= 60* 60 && amount > 0)){
        return;
      }
      setSessionTime(prev => prev + amount);
      if(!timerOn){
        setDisplayTime(sessionTime + amount);
      }
    }
  }

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if(!timerOn){
      let interval = setInterval(() =>{
       date = new Date().getTime();
       if( date > nextDate ){
         setDisplayTime((prev) => {
          if(prev <=0 && !onBreakVariable){
            onBreakVariable = true;
            playBreakTime();
            setOnBreak(true);
            return breakTime;
          } else if(prev <= 0 && onBreakVariable ){
            onBreakVariable = false;
            playBreakTime();
            setOnBreak(false);
            return sessionTime;
          }
          return prev - 1;
        });
        nextDate += second; 
       }
            
           
      }, 1000);
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
    }
    else{
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  }
  const resetTime = () => {
    setDisplayTime(25* 60);
    setBreakTime(5* 60);
    setSessionTime(25 * 60);
  }

  const playBreakTime = () => {
     breakAudio.currentTime = 0;
     breakAudio.play();

  }
   
  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className='dual-container'>
      <Lengths title="break length" changeTime={changeTime}
      type={"break"} 
      time={breakTime / 60} formatTime={formatTime} 
      id = "break-label"
      decrement = "break-decrement"
      increment = "break-increment" 
      len="break-length"/>

      <Lengths title="session length" changeTime={changeTime} 
      type={"session"} time={sessionTime / 60} 
      formatTime={formatTime} id= "session-label" 
      decrement = "session-decrement"
      increment = "session-increment"
      len = "session-length"
       />
     </div>
      <h3 id="timer-label">
       {onBreak ? "Break" : "Session"}
      </h3>

      <h1 id="time-left">{formatTime(displayTime)}</h1>
      <button className='btn-large deep-purple lighten-2' id = "start_stop" onClick = {controlTime}>
        {timerOn ? 
        <i className = "material-icons">pause_circle_filled</i> : 
        <i className = "material-icons">play_circle_filled</i>
      }
      </button>
      <button className='btn-large deep-purple lighten-2' id = "reset"  onClick={resetTime}>
      <i className = "material-icons">autorenew</i>
      </button>
    </div>
  );
}


export default App;
