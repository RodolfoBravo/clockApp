import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLenght: 5,
      sessionLenght: 25,
      time: '25:00',
      play: true
    }
    this.runTimer = this.runTimer.bind(this);
  }

  runTimer() {
    this.setState({
      play: !this.state.play
    })
  }
  render() 
  {
    const classes = this.state.play
      ? ['fa-solid fa-play']
      : [ 'fa-solid fa-stop'];
  
    return (
      <main className='container'>
        <h1> 25 + 5 Clock </h1>
        <div className='row'>
          <div className='col'>
            <p id='break-label' className='text-length'>Break Length</p>
            <div className='col d-flex flex-row justify-content-center'>
              <button id='break-increment' className='btn btn-inline btnStyle'><i className="fa-solid fa-arrow-down"></i></button>
              <p id='break-length' className='align-self-center textDisplay'>{this.state.breakLenght}</p>
              <button id='break-decrement' className='btn btn-inline btnStyle'><i className="fa-solid fa-arrow-up"></i></button>
            </div>
          </div>

          <div className='col'>
            <p id='session-label' className='text-length'>Session Length</p>
            <div className='col d-flex flex-row justify-content-center'>
              <button id='session-increment' className='btn btn-inline btnStyle'><i className="fa-solid fa-arrow-down"></i></button>
              <p id='session-length' className='align-self-center textDisplay'>{this.state.sessionLenght}</p>
              <button id='session-decrement' className='btn btn-inline btnStyle'><i className="fa-solid fa-arrow-up"></i></button>
            </div>
          </div>

        </div>
        <div className='row controlDisplay'>
          <p id='timer-label'>Session</p>
          <p id='time-left'>{this.state.time}</p>
        </div>
        <div className='row d-flex flex-row'>
        <div className='col'>
          <button onClick={this.runTimer} id='start_stop'>
            <i className={classes[0]}></i>
          </button>
          <button  id='reset'>
          <i className="fa-solid fa-arrows-rotate"></i>
          </button>
          </div>
        </div>
      </main>
    )
  }
}


export default App;
