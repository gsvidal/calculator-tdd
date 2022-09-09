import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { evaluate } from 'mathjs';

import { useState } from 'react';

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];

const operators = ['+', '-', '*', '/'];

const equalSign = '=';

const Calculator = () => {
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
        <span onClick={() => setValue(evaluate(value))}>{equalSign}</span>
      </div>
    </>
  );
};

describe('Calculator', () => {
  afterEach(cleanup);

  it('should render', () => {
    render(<Calculator />);
  });

  it('should render title correctly', () => {
    render(<Calculator />);

    screen.getByText('Calculator');
  });

  it('should render 4 rows', () => {
    render(<Calculator />);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4);
  });

  it('should render numbers', () => {
    render(<Calculator />);

    numbers.forEach((number) => {
      screen.getByText(number);
    });
  });

  it('should render operations', () => {
    render(<Calculator />);

    operators.forEach((operation) => {
      screen.getByText(operation);
    });
  });

  it('should render equal sign', () => {
    render(<Calculator />);

    screen.getByText(equalSign);
  });

  it('should render input box', () => {
    render(<Calculator />);

    screen.getByRole('textbox');
  });

  it('should input after clicking a number', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one); // setState updates are asynchronous in React

    const input = screen.getByRole('textbox');

    expect(input.value).toBe('1');
  });

  it('should input after clicking many numbers', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one);

    const two = screen.getByText('2');
    await userEvent.click(two);

    const input = screen.getByRole('textbox');

    expect(input.value).toBe('12');
  });

  it('should input after clicking numbers and operators', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one);

    const plus = screen.getByText('+');
    await userEvent.click(plus);
    await userEvent.click(one);

    const input = screen.getByRole('textbox');

    expect(input.value).toBe('1+1');
  });

  it('should show a valid result in an input after doing a random operation between 2 random numbers', async () => {
    render(<Calculator />);

    // Random numbers have to match values from 0 to 9 and random operators
    const randomNumber1 = numbers[Math.floor(Math.random() * numbers.length)];
    const randomNumber2 = numbers[Math.floor(Math.random() * numbers.length)];
    const randomOperator =
      operators[Math.floor(Math.random() * operators.length)];

    const randomNumberElement1 = screen.getByText(randomNumber1);
    await userEvent.click(randomNumberElement1);

    const randomOperatorElement = screen.getByText(randomOperator);
    await userEvent.click(randomOperatorElement);

    const randomNumberElement2 = screen.getByText(randomNumber2);
    await userEvent.click(randomNumberElement2);

    const equal = screen.getByText(equalSign);
    await userEvent.click(equal);

    const input = screen.getByRole('textbox');
    switch (randomOperator) {
      case '+':
        expect(input.value).toBe((randomNumber1 + randomNumber2).toString());
        break;
      case '-':
        expect(input.value).toBe((randomNumber1 - randomNumber2).toString());
        break;
      case '*':
        expect(input.value).toBe((randomNumber1 * randomNumber2).toString());
        break;
      case '/':
        expect(input.value).toBe((randomNumber1 / randomNumber2).toString());
        break;
    }
  });

  it('should show an input with a valid result of the multiplication between 2 random numbers', async () => {
    render(<Calculator />);

    // Random numbers have to match values from 0 to 9 (as a calculator)
    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);

    const randomNumberElement1 = screen.getByText(randomNumber1);
    await userEvent.click(randomNumberElement1);

    const by = screen.getByText('*');
    await userEvent.click(by);

    const randomNumberElement2 = screen.getByText(randomNumber2);
    await userEvent.click(randomNumberElement2);

    const equal = screen.getByText(equalSign);
    await userEvent.click(equal);

    const input = screen.getByRole('textbox');

    expect(input.value).toBe((randomNumber1 * randomNumber2).toString());
  });
});
