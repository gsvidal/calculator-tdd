import { useState } from 'react';
import { evaluate } from 'mathjs';
import deleteButton from './assets/icons/delete.svg';

export const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];

export const operators = ['+', '-', '*', '/'];

export const equalSign = '=';

export const clearSign = 'C';

export const clearEntrySign = 'CE';

export const Calculator = () => {
  const [value, setValue] = useState('');

  const handleClickButtons = (newValue, buttonType) => {
    if (typeof value === 'number' && buttonType === 'num') {
      setValue(newValue.toString());
    } else {
      setValue(value.toString().concat(newValue));
    }
  };

  const handleEvaluation = () => {
    setValue(evaluate(value));
  };

  const handleClearEntrySign = () => {
    let lastNumberEntry = value.split(/[*+-/]+/).pop();
    var replaceExp = new RegExp(`\\b${lastNumberEntry}$\\b`, 'g');
    setValue(value.replace(replaceExp, ''));
  };

  return (
    <>
      <h1>Calculator</h1>
      <input type="text" value={value} readOnly />
      <div role="grid">
        {rows.map((row, index) => (
          <div key={index} role="row">
            {row.map((number) => (
              <button
                onClick={() => handleClickButtons(number, 'num')}
                key={number}
              >
                {number}
              </button>
            ))}
          </div>
        ))}
        {operators.map((operator) => (
          <button
            onClick={() => handleClickButtons(operator, 'op')}
            key={operator}
          >
            {operator}
          </button>
        ))}
        <button onClick={() => setValue('')}>{clearSign}</button>
        <button onClick={handleClearEntrySign}>{clearEntrySign}</button>
        <button onClick={() => setValue(value.slice(0, -1))}>
          <img src={deleteButton} alt="delete button" width="15" />
        </button>
        <button onClick={handleEvaluation}>{equalSign}</button>
      </div>
    </>
  );
};
