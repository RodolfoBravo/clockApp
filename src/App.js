import React, { useEffect } from 'react';
import './App.scss';
import dateFormat, { masks } from "dateformat";




class App extends React.Component {
  constructor(props) {
    const timeNow = new Date('00', '00');
    timeNow.setMinutes(timeNow.getMinutes() + 25);
    var timeStart = dateFormat(timeNow, 'MM:ss')
    super(props);
    this.state = {
      breakLenght: 5,
      sessionLenght: 25,
      time: timeStart,
      play: true
    }
    this.startStopTimer = this.startStopTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  reset() {
    const timeNow = new Date('00', '00');
    timeNow.setMinutes(timeNow.getMinutes() + 25);
    var timeStart = dateFormat(timeNow, 'MM:ss')
    this.setState({
      breakLenght: 5,
      sessionLenght: 25,
      time: timeStart
    })
  }

  startStopTimer() {
    this.setState({
      play: !this.state.play
    })
  }




  increment(event) {
    var type = event.target.value;
    var breakValue = this.state.breakLenght
    var sessionValue = this.state.sessionLenght
    if (type == 'break' && breakValue < 60) {
      breakValue += 1
      this.setState({
        breakLenght: breakValue
      })
    } else if (type == 'session' && sessionValue < 60) {
      sessionValue += 1
      if(sessionValue == 60){
        var timeStart = '60:00';
      }else{
        const timeNow = new Date('00', '00');
        timeNow.setMinutes(timeNow.getMinutes() + sessionValue);
        var timeStart = dateFormat(timeNow, 'MM:ss')
      }
       
      this.setState({
        sessionLenght: sessionValue,
        time: timeStart
      })
    }
  }

  decrement(event) {
    var type = event.target.value;
    var breakValue = this.state.breakLenght
    var sessionValue = this.state.sessionLenght
    if (type == 'break' && breakValue > 1) {
      breakValue -= 1
      this.setState({
        breakLenght: breakValue
      })
    } else if (type == 'session' && sessionValue > 1) {
      sessionValue -= 1
      const timeNow = new Date('00', '00');
      timeNow.setMinutes(timeNow.getMinutes() + (this.state.sessionLenght-1));
      var timeStart = dateFormat(timeNow, 'MM:ss')
      this.setState({
        sessionLenght: sessionValue,
      time:timeStart
      })
    }
  }

  render() {
    const classes = this.state.play
      ? ['fa-solid fa-play']
      : ['fa-solid fa-stop'];

    return (
      <main className='container'>
        <h1> 25 + 5 Clock </h1>
        <div className='row'>
          <div className='col'>
            <p id='break-label' className='text-length'>Break Length</p>
            <div className='col d-flex flex-row justify-content-center'>
              <button
                id='break-decrement'
                className='btn btn-outline-dark btnStyle'
                onClick={this.decrement}
                value='break'
              >↓</button>
              <p id='break-length' className='align-self-center textDisplay'>{this.state.breakLenght}</p>
              <button
                id='break-increment'
                className='btn btn-outline-dark btnStyle'
                onClick={this.increment}
                value='break'
              >↑</button>
            </div>
          </div>

          <div className='col'>
            <p id='session-label' className='text-length'>Session Length</p>
            <div className='col d-flex flex-row justify-content-center'>
              <button
                id='session-increment'
                className='btn btn-outline-dark btnStyle'
                onClick={this.decrement}
                value='session'
              >↓</button>
              <p id='session-length' className='align-self-center textDisplay'>{this.state.sessionLenght}</p>
              <button
                id='session-decrement'
                className='btn btn-outline-dark btnStyle'
                onClick={this.increment}
                value='session'
              >↑</button>
            </div>
          </div>

        </div>
        <div className='row controlDisplay'>
          <p id='timer-label'>Session</p>
          <p id='time-left'>{this.state.time}</p>
        </div>
        <div className='row d-flex flex-row'>
          <div className='col'>
            <button
              onClick={this.startStopTimer}
              id='start_stop'
              className='btn btn-outline-dark'
            >
              <i className={classes[0]}></i>
            </button>
            <button id='reset' className='btn btn-outline-dark' onClick={this.reset}>
              <i className="fa-solid fa-arrows-rotate"></i>
            </button>
          </div>
        </div>
      </main>
    )
  }
}


export default App;
