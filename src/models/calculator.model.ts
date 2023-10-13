import { error } from 'console';
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel, ICalculatorState } from '../interfaces/calculator-model.interface';

class EnteringFirstOperand implements ICalculatorState {
  private calculator: CalculatorModel;

  constructor(calculator: CalculatorModel) {
    this.calculator = calculator;
  }

  pressNumericKey(key: NumericKeys): void {
    if (this.calculator.input.length === 0) {
      this.calculator.input.push(key);
    } else if (this.calculator.input.length === 1) {
      this.calculator.input[0] += key;
    }
  }
  pressOperatorKey(key: OperatorKeys): void {
    this.calculator.input.push(key);
    this.calculator.setState(this.calculator.getSecondState());
  }
  pressActionKey(key: ActionKeys): void {
    // nothing happens
  }
}

class EnteringSecondOperand implements ICalculatorState {
  private calculator: CalculatorModel;

  constructor(calculator: CalculatorModel) {
    this.calculator = calculator;
  }

  pressNumericKey(key: NumericKeys): void {
    if (this.calculator.input.length === 2) {
      this.calculator.input.push(key);
    } else if (this.calculator.input.length === 3) {
      this.calculator.input[2] += key;
    }
  }
  pressOperatorKey(key: OperatorKeys): void {
    if (this.calculator.input[1] === OperatorKeys.MULT) {
      const computeValue = Number(this.calculator.input[0]) * Number(this.calculator.input[2]);
      this.calculator.input = [String(computeValue), key];
    } else if (this.calculator.input[1] === OperatorKeys.DIV) {
      const computeValue = Number(this.calculator.input[0]) / Number(this.calculator.input[2]);
      this.calculator.input = [String(computeValue), key];
    } else if (
      this.calculator.input[1] === OperatorKeys.PLUS ||
      this.calculator.input[1] === OperatorKeys.MINUS
    ) {
      this.calculator.input.push(key);
      this.calculator.setState(this.calculator.getThirdState());
    }
  }
  pressActionKey(key: ActionKeys): void {
    if (key === ActionKeys.EQUALS) {
      const first = Number(this.calculator.input[0]);
      const second = Number(this.calculator.input[2]);
      const operator = this.calculator.input[1];
      let computeValue;

      if (operator === OperatorKeys.PLUS) {
        computeValue = first + second;
      } else if (operator === OperatorKeys.MINUS) {
        computeValue = first - second;
      } else if (operator === OperatorKeys.MULT) {
        computeValue = first * second;
      } else if (operator === OperatorKeys.DIV) {
        computeValue = first / second;
      }

      this.calculator.input = new Array(String(computeValue));
    }
  }
}

class EnteringThirdOperand implements ICalculatorState {
  private calculator: CalculatorModel;

  constructor(calculator: CalculatorModel) {
    this.calculator = calculator;
  }

  pressNumericKey(key: NumericKeys): void {
    if (this.calculator.input.length === 4) {
      this.calculator.input.push(key);
    } else if (this.calculator.input.length === 5) {
      this.calculator.input[4] += key;
    }
  }
  pressOperatorKey(key: OperatorKeys): void {
    if (this.calculator.input[3] === OperatorKeys.MULT) {
      const computeValue = Number(this.calculator.input[2]) * Number(this.calculator.input[4]);
      this.calculator.input = [
        this.calculator.input[0],
        this.calculator.input[1],
        String(computeValue),
        key,
      ];
    } else if (this.calculator.input[3] === OperatorKeys.DIV) {
      const computeValue = Number(this.calculator.input[2]) / Number(this.calculator.input[4]);
      this.calculator.input = [
        this.calculator.input[0],
        this.calculator.input[1],
        String(computeValue),
        key,
      ];
    } else if (
      this.calculator.input[1] === OperatorKeys.PLUS ||
      this.calculator.input[1] === OperatorKeys.MINUS
    ) {
      const computeValue = Number(this.calculator.input[0]) / Number(this.calculator.input[2]);
      this.calculator.input = [
        String(computeValue),
        this.calculator.input[3],
        this.calculator.input[4],
        key,
      ];
    }
  }
  pressActionKey(key: ActionKeys): void {
    if (key === ActionKeys.EQUALS) {
      const first = Number(this.calculator.input[0]);
      const second = Number(this.calculator.input[2]);
      const third = Number(this.calculator.input[4]);
      const firstOperator = this.calculator.input[1];
      const secondOperator = this.calculator.input[3];
      let firstComputeValue = 0;
      let finalComputeValue = 0;

      if (secondOperator === OperatorKeys.PLUS) {
        firstComputeValue = second + third;
      } else if (secondOperator === OperatorKeys.MINUS) {
        firstComputeValue = second - third;
      } else if (secondOperator === OperatorKeys.MULT) {
        firstComputeValue = second * third;
      } else if (secondOperator === OperatorKeys.DIV) {
        firstComputeValue = second / third;
      }

      if (firstOperator === OperatorKeys.PLUS) {
        finalComputeValue = first + firstComputeValue;
      } else if (firstOperator === OperatorKeys.MINUS) {
        finalComputeValue = first - firstComputeValue;
      } else if (firstOperator === OperatorKeys.MULT) {
        finalComputeValue = first * firstComputeValue;
      } else if (firstOperator === OperatorKeys.DIV) {
        finalComputeValue = first / firstComputeValue;
      }

      this.calculator.input = new Array(String(finalComputeValue));
    }
  }
}

export class CalculatorModel implements ICalculatorModel {
  private firstState: ICalculatorState;
  private secondState: ICalculatorState;
  private thirdState: ICalculatorState;
  private currentState: ICalculatorState;
  public input: Array<string>; // input string

  constructor() {
    this.firstState = new EnteringFirstOperand(this);
    this.secondState = new EnteringSecondOperand(this);
    this.thirdState = new EnteringThirdOperand(this);
    this.currentState = this.firstState;
    this.input = [];
  }

  public setState(state: ICalculatorState) {
    this.currentState = state;
  }

  public getSecondState(): ICalculatorState {
    return this.secondState;
  }

  public getThirdState(): ICalculatorState {
    return this.thirdState;
  }

  public pressNumericKey(key: NumericKeys): void {
    this.currentState.pressNumericKey(key);
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this.currentState.pressOperatorKey(key);
  }

  public pressActionKey(key: ActionKeys): void {
    this.currentState.pressActionKey(key);
  }

  public display(): string {
    let displayString = '';

    for (let i = 0; i < this.input.length; i++) {
      displayString += this.input[i];
    }

    return displayString;
  }
}

// if in first state, add digit to input string

// if in second state, add digit to input string

// if in third state, add digit to input string
// ----
// if in first state, add operator to input string and change to second state

// if in second state,
// if input[1] is * or /, recompute string and add operator to input string (stay in second state)
// if input[1] is + or -, add operator to input string and change to third state

// if in third state
// if input[3] is * or /, recompute string (i[2] and i[4]) and add operator (stay in third)
// if input[3] is + or -, recompute string (i[0] and i[2]) and add operator (stay in third)
// -----
// if in first state, do nothing

// if in second state, compute 0 and 2
// 2 * 2

// if in third state, computer 0, 2, and 4
// computer 2 and 4 first, then 0 and (2,4)
// 2 + 2 + 3
