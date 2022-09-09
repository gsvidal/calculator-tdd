import { useState } from 'react';
import { evaluate } from 'mathjs';

export const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];

export const operators = ['+', '-', '*', '/'];

export const equalSign = '=';

export const Calculator = () => {
  const [value, setValue] = useState('');

  const handleClickButtons = (newValue) => setValue(value.concat(newValue));

  return (
    <>
      <h1>Calculator</h1>
      <input type="text" value={value} readOnly />
      <div role="grid">
        {rows.map((row, index) => (
          <div key={index} role="row">
            {row.map((number) => (
              <button onClick={() => handleClickButtons(number)} key={number}>
                {number}
              </button>
            ))}
          </div>
        ))}
        {operators.map((operator) => (
          <button onClick={() => handleClickButtons(operator)} key={operator}>
            {operator}
          </button>
        ))}
        <button onClick={() => setValue(evaluate(value))}>{equalSign}</button>
      </div>
    </>
  );
};
