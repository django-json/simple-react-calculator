import React, { Component } from 'react';
import safeEval from 'safe-eval';

import './App.scss';

import Result from '../components/result/result.component';
import KeyPad from '../components/keypad/keypad.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      result: ""
    }

    this.onClick = this.onClick.bind(this);
    this.calculate = this.calculate.bind(this);
    this.reset = this.reset.bind(this);
  }

  onClick(e) {
    const value = e.target.name;

    if(value === "clear") {
      this.reset();
    } 
    else if(value === "=") {
      this.calculate();
    }
    else {
      this.setState({ result: this.state.result + value });
    }
  }

  calculate() {
    /*
      Throws error when the value of "result" is not an expression.
    */
    try {
      this.setState({
        result: safeEval(this.state.result),
      });
    } catch (error) {
      this.setState({ result: "" });
      alert("Error");
    }
  }

  reset() {
    this.setState({ result: "" });
  }

  render() {
    const { result } = this.state;
    return (
      <div className="react-calculator">
        <Result result={result} />
        <KeyPad onClick={this.onClick} />
      </div>
    );
  }
}

export default App;
