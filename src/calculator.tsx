import './calculator.css';
import { CalculatorDisplay, CalculatorKey } from './components';
import { NumericKeys } from './enums/numeric-keys.enum';
import { OperatorKeys } from './enums/operator-keys.enum';
import { ActionKeys } from './enums/action-keys.enum';
import { useState } from 'react';
import { ICalculatorModel } from './interfaces/calculator-model.interface';
import { CalculatorModel } from './models/calculator.model';

const calculatorModel: ICalculatorModel = new CalculatorModel();

export default function Calculator() {

  const [display, setDisplay] = useState(calculatorModel.display());
  
  function numericKeyPressHandler(key: NumericKeys): void {
    calculatorModel.pressNumericKey(key);
    setDisplay(calculatorModel.display());
  }

  function operatorKeyPressHandler(operator: OperatorKeys): void {
    calculatorModel.pressOperatorKey(operator);
    setDisplay(calculatorModel.display());
  }

  function actionKeyPresHandler(action: ActionKeys): void {
    calculatorModel.pressActionKey(action);
    setDisplay(calculatorModel.display());
  }
  /*
  function dummy(key: NumericKeys | OperatorKeys | ActionKeys): void {
    alert(`${key}-key pressed.`);
  }
  */
  return (
    <div className='container'>
      <div className="calculator">

        
        <CalculatorDisplay displayValue={display} />


        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <CalculatorKey className="key-clear" label={ActionKeys.CLEAR} onPress={actionKeyPresHandler} />
              <CalculatorKey className="key-sign" label={ActionKeys.SIGN_FLIP} onPress={actionKeyPresHandler} />
              <CalculatorKey className="key-percent" label={OperatorKeys.SQRT} onPress={actionKeyPresHandler} />
            </div>
            <div className="digit-keys">
              <CalculatorKey className="key-0" label={NumericKeys.ZERO} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-dot" label={ActionKeys.DOT} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-1" label={NumericKeys.ONE} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-2" label={NumericKeys.TWO} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-3" label={NumericKeys.THREE} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-4" label={NumericKeys.FOUR} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-5" label={NumericKeys.FIVE} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-6" label={NumericKeys.SIX} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-7" label={NumericKeys.SEVEN} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-8" label={NumericKeys.EIGHT} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-9" label={NumericKeys.NINE} onPress={numericKeyPressHandler} />
            </div>
          </div>
          <div className="operator-keys">
            <CalculatorKey className="key-divide" label={OperatorKeys.DIV} onPress={operatorKeyPressHandler} />
            <CalculatorKey className="key-multiply" label={OperatorKeys.MULT} onPress={operatorKeyPressHandler} />
            <CalculatorKey className="key-subtract" label={OperatorKeys.MINUS} onPress={operatorKeyPressHandler} />
            <CalculatorKey className="key-add" label={OperatorKeys.PLUS} onPress={operatorKeyPressHandler} />
            <CalculatorKey className="key-equals" label={ActionKeys.EQUALS} onPress={actionKeyPresHandler} />
          </div>
        </div>
      </div>
    </div>
  ) 
}  
