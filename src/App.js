import './App.css';
import React, {useState} from 'react';

function App() {
  const [input, setInput] = useState(null);
  const [output, setOutput] = useState(null);
  const [isInputInvalid, setIsInputInvalid] = useState(false);

  const computeOutput = (e) => {
    const newInputValue = e.target.value;
    setInput(newInputValue);

    const inputValues = newInputValue.split(',');

    if (!validateInputValues(inputValues)) {
      setIsInputInvalid(true);  
      setOutput('');
      return;
    }

    if (isInputInvalid) {
      setIsInputInvalid(false);
    }

    setOutput(convertInputToOutput(inputValues));
  }

  const validateInputValues = (inputValues) => {
    const invalidValues = inputValues.filter((val) => isNaN(val));
    return invalidValues.length === 0;
  }

  const convertInputToOutput = (inputValues) =>
    inputValues.map((num) => 
      num.trim().length === 0 ? '' : num * 2
    )
    .toString();
  
  return (
    <div className="App">
      <div className="contents">
        <div className="section">
          <h2>Input</h2>
          <label>Array</label>
          <input
            className="input"
            type="text"
            value={input}
            onChange={computeOutput}
          />
          {isInputInvalid &&
            <label className="invalid-input-msg">
              Invalid input. Please enter a comma-separated list of numbers.
            </label>
          }
        </div>
        <div className="section">
          <h2>Output</h2>
          <label>Double</label>
          <input
            className="output"
            type="text"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App;
