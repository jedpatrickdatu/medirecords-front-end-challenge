import './App.css';
import React, {useState} from 'react';

function App() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);

  const computeOutput = (e: {target: {value: string}}): void => {
    const newInputValue: string = e.target.value;
    setInput(newInputValue);

    const inputValues: string[] = newInputValue.split(',');

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

  const validateInputValues = (inputValues: string[]): boolean => {
    const invalidValues: string[] = inputValues.filter((val: string) => isNaN(val as any));
    return invalidValues.length === 0;
  }

  const convertInputToOutput = (inputValues: string[]): string =>
    inputValues.map((num: string) => 
      num.trim().length === 0 ? '' : Number(num) * 2
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
