import React from 'react';
import './App.scss';

function convertTime(secTotal) {
  if (secTotal == 3600) {
    return ('60:00')
  } else {
    secTotal %= 3600;
    let minutes = Math.floor(secTotal / 60);
    let seconds = secTotal % 60;
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    return (minutes + ':' + seconds);
  }
}

class App extends React.Component {
  constructor(props) {
    console.log();
    super(props);
    this.state = {
      breakLenght: 5,
      sessionLenght: 25,
      seg: 1500,
      time: convertTime(1500),
      play: true,
      intervalId: '',
      type: 'Session',
      style: { color: '#000' }
    }
    this.startStopTimer = this.startStopTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.sound = this.sound.bind(this);
  }

  reset() {
    clearInterval(this.state.intervalId)
    this.setState({
      breakLenght: 5,
      sessionLenght: 25,
      seg: 1500,
      time: convertTime(1500),
      play: true,
      type: 'Session',
      style: { color: '#000' }
    })
    this.beepAudio.pause();
    this.beepAudio.currentTime = 0;
  }

  startStopTimer() {
    var isPlay = this.state.play;
    
    let flag;
    if (isPlay) {
      const intervalId = setInterval(() => {
        console.log(this.state.seg);
        this.setState({
          intervalId: intervalId
        })
        var timerType = (this.state.type == 'Session' ?
          this.setState({ type: 'Session' }) :
          this.state.type == 'Break' ?
            this.setState({ type: 'Break' }) :
            '')
        if (flag) {
          timerType = (this.state.type == 'Session' ?
            "Break" :
            this.state.type == 'Break' ?
              'Session' :
              '')
          var timerSeg = (timerType == 'Break' ?
            (this.state.breakLenght * 60) :
            timerType == 'Session' ?
              (this.state.sessionLenght * 60) :
              0)
          this.setState({
            type: timerType,
            seg: timerSeg,
            time: convertTime(timerSeg)
          })
          flag = false;
        }
        var timer = this.state.seg;
        if (timer > 0) {
          timer -= 1;
          timer < 60 ?
            this.setState({
              style: { color: '#870000' }
            })
            :
            this.setState({
              style: { color: '#000' }
            })

          this.setState({
            time: convertTime(timer),
            seg: timer
          })
          if (timer == 0) {
            this.sound(timer);
            flag = true;
            this.setState({
              time: convertTime(timer),
              seg: timer
            })
          }

        }
        console.log(timer);

        
      }, 1000);
      this.setState({
        intervalId: intervalId
      })
    } else {
      clearInterval(this.state.intervalId)
    }

    this.setState({
      play: !this.state.play
    })

  }

  sound() {
    this.beepAudio.play();
  }

  increment(event) {
    var type = event.target.value;
    var breakValue = this.state.breakLenght
    var sessionValue = this.state.sessionLenght
    if (this.state.intervalId != '') {
      clearInterval(this.state.intervalId)
    }
    if (type == 'break' && breakValue < 60) {
      breakValue += 1
      if (this.state.type=='Break'){
        this.setState({
          breakLenght: breakValue,
          seg: breakValue * 60,
          time: convertTime(breakValue * 60)
        })  
      } else{
      this.setState({
        breakLenght: breakValue
      })}
    } else if (type == 'session' && sessionValue < 60) {
      sessionValue += 1
      if (this.state.type=='Session'){
        this.setState({
        sessionLenght: sessionValue,
        time: convertTime(sessionValue * 60),
        seg: sessionValue * 60
      })} else {
        this.setState({
          sessionLenght: sessionValue})
      }
      
    }
  }

  decrement(event) {
    var type = event.target.value;
    var breakValue = this.state.breakLenght
    var sessionValue = this.state.sessionLenght
    if (this.state.intervalId != '') {
      clearInterval(this.state.intervalId)
    }
    if (type == 'break' && breakValue > 1) {
      breakValue -= 1
      if (this.state.type=='Break'){
        this.setState({
          breakLenght: breakValue,
          seg: breakValue * 60,
          time: convertTime(breakValue * 60)
        })  
      } else{
      this.setState({
        breakLenght: breakValue
      })}
      console.log(breakValue);

    } else if (type == 'session' && sessionValue > 1) {
     
      sessionValue -= 1
      if (this.state.type=='Session'){
        this.setState({
        sessionLenght: sessionValue,
        time: convertTime(sessionValue * 60),
        seg: sessionValue * 60
      })} else {
        this.setState({
          sessionLenght: sessionValue})
      }
      console.log(this.state.sessionLenght);
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
                disabled={!this.state.play}
              >↓</button>
              <p id='break-length' className='align-self-center textDisplay'>{this.state.breakLenght}</p>
              <button
                id='break-increment'
                className='btn btn-outline-dark btnStyle'
                onClick={this.increment}
                value='break'
                disabled={!this.state.play}
              >↑</button>
            </div>
          </div>

          <div className='col'>
            <p id='session-label' className='text-length'>Session Length</p>
            <div className='col d-flex flex-row justify-content-center'>
              <button
                id='session-decrement'
                className='btn btn-outline-dark btnStyle'
                onClick={this.decrement}
                value='session'
                disabled={!this.state.play}
              >↓</button>
              <p id='session-length' className='align-self-center textDisplay'>{this.state.sessionLenght}</p>
              <button
                id='session-increment'
                className='btn btn-outline-dark btnStyle'
                onClick={this.increment}
                value='session'
                disabled={!this.state.play}
              >↑</button>
            </div>
          </div>

        </div>
        <div className='row controlDisplay'>
          <p id='timer-label' style={this.state.style}>{this.state.type}</p>
          <p id='time-left' style={this.state.style}>{this.state.time}</p>
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
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.beepAudio = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </main>
    )
  }
}


export default App;
