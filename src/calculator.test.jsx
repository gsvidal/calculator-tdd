import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

import {
  numbers,
  operators,
  clearSign,
  clearEntrySign,
  equalSign,
  Calculator,
} from './Calculator';
import { equal } from 'mathjs';

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

  it('should render equal sign button', () => {
    render(<Calculator />);

    screen.getByText(equalSign);
  });

  it('should render clear sign button', () => {
    render(<Calculator />);

    screen.getByText(clearSign);
  });

  it('should render input box', () => {
    render(<Calculator />);

    screen.getByRole('textbox');
  });

  it('should show input value after clicking a number button', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one); // setState updates are asynchronous in React

    const input = screen.getByRole('textbox');

    expect(input.value).toBe('1');
  });

  it('should show input value after clicking many numbers buttons', async () => {
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

    const times = screen.getByText('*');
    await userEvent.click(times);

    const randomNumberElement2 = screen.getByText(randomNumber2);
    await userEvent.click(randomNumberElement2);

    const equal = screen.getByText(equalSign);
    await userEvent.click(equal);

    const input = screen.getByRole('textbox');

    expect(input.value).toBe((randomNumber1 * randomNumber2).toString());
  });

  it('should render a clear button (C)', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one);

    const plus = screen.getByText('+');
    await userEvent.click(plus);

    await userEvent.click(one);

    const clearButton = screen.getByText(clearSign);
    await userEvent.click(clearButton);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('');
  });

  it('should render a clear entry button', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one);

    const plus = screen.getByText('+');
    await userEvent.click(plus);

    const two = screen.getByText('2');
    await userEvent.click(two);

    const times = screen.getByText('*');
    await userEvent.click(times);

    const three = screen.getByText('3');
    await userEvent.click(three);

    const by = screen.getByText('/');
    await userEvent.click(by);

    const four = screen.getByText('4');
    await userEvent.click(four);

    const clearEntryButton = screen.getByText(clearEntrySign);
    await userEvent.click(clearEntryButton);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1+2*3/');
  });

  it('should render a delete button', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one);
    await userEvent.click(one);
    await userEvent.click(one);

    const deleteButton = screen.getByAltText('delete button');
    await userEvent.click(deleteButton);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('11');
  });

  it('should show a new input value when clicking more buttons after getting a result after equal sign button', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one);

    const plus = screen.getByText('+');
    await userEvent.click(plus);

    await userEvent.click(one);

    const equal = screen.getByText(equalSign);
    await userEvent.click(equal);

    await userEvent.click(plus);
    await userEvent.click(one);

    await userEvent.click(equal);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('3');
  });

  it('should overwrite the input value when click a number button after make a calculation previously (click equal button)', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one);

    const plus = screen.getByText('+');
    await userEvent.click(plus);

    await userEvent.click(one);

    const equal = screen.getByText(equalSign);
    await userEvent.click(equal);

    const four = screen.getByText('4');
    await userEvent.click(four);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('4');
  });

  it('should overwrite once the input value when click a number button after make a calculation previously (click equal button)', async () => {
    render(<Calculator />);

    const one = screen.getByText('1');
    await userEvent.click(one);

    const plus = screen.getByText('+');
    await userEvent.click(plus);

    await userEvent.click(one);

    const equal = screen.getByText(equalSign);
    await userEvent.click(equal);

    const four = screen.getByText('4');
    await userEvent.click(four);

    await userEvent.click(four);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('44');
  });
});
