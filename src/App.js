import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLenght: 5,
      sessionLenght:25
    }
  }
  render() {
    return (
      <main className='container'>
        <div className='row'>
          <div className='col'>
            <p id='break-label'>Break Length</p>
            <div className='col d-flex flex-row'>
            <button id='break-increment'><i className="fa-solid fa-arrow-down"></i></button>
            <p id='break-length'>{this.state.breakLenght}</p>
            <button id='break-decrement'><i className="fa-solid fa-arrow-up"></i></button>
            </div>
          </div>

          <div className='col'>
            <p id='session-label'>Session Length</p>
            <div className='col d-flex flex-row'>
            <button id='session-increment'><i className="fa-solid fa-arrow-down"></i></button>
            <p id='session-length'>{this.state.sessionLenght}</p>
            <button id='session-decrement'><i className="fa-solid fa-arrow-up"></i></button>
            </div>
          </div>

        </div>
      </main>
    )
  }
}


export default App;
