import {TOperators, TActions, operators} from './Keys';
import useStore from 'hooks/use-store';
import KeyPad from './Keypad'
import Display from './Display';
import classes from './Calculator.module.scss';
import { useEffect } from 'react';

const commafy = (str:string): string => {
  let strArr = str.split('.');
  if (strArr[0].length >= 5) {
      strArr[0] = strArr[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (strArr[1] && str[1].length >= 5) {
      strArr[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return strArr.join('.');
}

const calculate = (number1:number, number2:number, operator:TOperators):number =>
{
  switch (operator) {
    case TOperators.Multiplication:
      return number1*number2;        
    case TOperators.Division:
      return number1/number2;
    case TOperators.Addition:
      return number1+number2;
    case TOperators.Subtraction:
      return number1-number2;
    case TOperators.Percent:
      return number1*number2/100;
  }
  throw new Error("Unhandled operator!");
}

const Calculator: React.FC<{className: string}> = (props) => {

  const maxDigitsAllowed:number = 15;
  const [store, dispatch] = useStore('calculator', true);
  const lastOperand = store.lastOperand;
  
  let operandStack:number[] = [ ...store.operands ];
  let operatorStack:number[] = [ ...store.operators ];

  while( operandStack.length > 1 )
  {
    let number1:number = operandStack.shift()!;
    let number2:number = operandStack.shift()!;
    let operator = operatorStack.shift()!;
    operandStack.unshift( calculate( number1, number2, operator) );
  }
  
  let rowBottom = '';
  if (operandStack.length > 0)
  {
    let result = 0;
    if (operatorStack.length > 0 && lastOperand.length>0)
    {
      const operator = operatorStack.shift()!;
        result = calculate( operandStack[0], parseFloat(lastOperand), operator );
    } else  {
      result = operandStack[0];
    }
    rowBottom = (Math.round( result * 10**7 )/10**7).toString();    

  }  

  let rowTop = '';
  operandStack = [...store.operands];
  operatorStack = [...store.operators];

  while( operandStack.length > 0 )
  {
    rowTop+= commafy( operandStack.shift()!.toString()) +" "+ operators.get(operatorStack.shift()!)+" ";
  }
  rowTop+= commafy(lastOperand);

  const handleNumbers = (val:number) => {
    if (lastOperand.length > maxDigitsAllowed)
      return;
    if ( lastOperand[0] === "0" && lastOperand[1] !== ".")
    {  
      if ( lastOperand.length > 0 && val === 0 )
        return false;
      dispatch( 'SETLASTOPERAND', val.toString() );
    }
    else
      dispatch( 'APPENDTOLASTOPERAND' , val.toString() );
  }

  const handleActions = (action: TActions) => {
    switch (action) {
      case TActions.Clear:
        dispatch('CLEAR', "0")
      break;
      case TActions.Back:
        if (lastOperand.length <= 1 )
        {
          if (store.operands.length === 0)
            dispatch( "SETLASTOPERAND", "0" );
          else
            dispatch('POP');
        }
        else {
          dispatch( "SETLASTOPERAND", (lastOperand.length>1 ? lastOperand.slice(0, -1) : "0") );
        }
      break;
      case TActions.Decimal:
        if (lastOperand.length > maxDigitsAllowed || lastOperand.includes('.') )
          return;
        if (lastOperand.length === 0) {
          dispatch( "SETLASTOPERAND", "0." );          
        } else {
          dispatch( "APPENDTOLASTOPERAND", "." );       
        }
      break;
      case TActions.Evaluate:
        dispatch( "CLEAR", rowBottom );   
      break;
    }
  };  

  const handleOperators = (operator: TOperators) => {
    const operand = (lastOperand.length > 0 ? parseFloat(lastOperand) : null);
    dispatch("PUSH", { operand , operator } );
  };

  return (
  <div className={`${classes.calculator} ${ props.className ?? ''}`}>

    <Display
      rowTopText={rowTop}
      rowBottomText={rowBottom}/>

    <KeyPad
      handleNumbers={ handleNumbers }
      handleActions = {handleActions }
      handleOperators = { handleOperators }
      />

  </div>
  );

};

export default Calculator;