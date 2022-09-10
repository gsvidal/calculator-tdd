import { useState } from 'react';
import { evaluate } from 'mathjs';
import deleteButton from './assets/icons/delete.svg';
import './Calculator.css';

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
    <div className="calculator">
      <h1>Calculator</h1>
      <section className="calculator__body">
        <input className="input" type="text" value={value} readOnly />
        <div className="buttons-wrapper">
          <div className="button-container button-container--operator">
            {operators.map((operator) => (
              <button
                className="button button--operator"
                onClick={() => handleClickButtons(operator, 'op')}
                key={operator}
              >
                <p>{operator}</p>
              </button>
            ))}
          </div>

          <div className="button-container button-container--number">
            {rows.map((row, index) => (
              <div key={index} role="row">
                {row.map((number) => (
                  <button
                    className="button button--number"
                    onClick={() => handleClickButtons(number, 'num')}
                    key={number}
                  >
                    {number}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="button-container button-container--extras">
            <button
              className="button button--extras"
              onClick={() => setValue('')}
            >
              {clearSign}
            </button>
            <button
              className="button button--extras"
              onClick={handleClearEntrySign}
            >
              {clearEntrySign}
            </button>
            <button
              className="button button--extras"
              onClick={() => setValue(value.slice(0, -1))}
            >
              <img src={deleteButton} alt="delete button" width="20" />
            </button>
            <button
              className="button button--extras"
              onClick={handleEvaluation}
            >
              {equalSign}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
