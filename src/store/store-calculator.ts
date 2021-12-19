import { TOperators } from 'components/Keys';
import { initStore } from 'hooks/use-store';


export type TCalculatorState = {
  operands: number[],
  operators: number[],
  lastOperand: string
}

const initialState:TCalculatorState = { operators: [], operands: [], lastOperand: "" }

const configureStore = (state:TCalculatorState = initialState) => {

  const actions = {
      CLEAR: ( state:TCalculatorState, defaultVal:string) => {
        const newState:TCalculatorState = { operators: [], operands: [], lastOperand: defaultVal}
        return newState;
      },
      PUSH: (state:TCalculatorState, payload:{operand:number,operator:number}) => {
        const newState = Object.assign({}, state);
        /* Last Operand is set and is a number, add operand and operator */
        if(payload.operand !== null && !isNaN(payload.operand) )
        {
          newState.operands.push(payload.operand);
          newState.operators.push(payload.operator);
          newState.lastOperand = "";
        } else {
          /* If last operand is not set, just change the last operator */
          if ( newState.lastOperand.length === 0) {
            console.log("bura");
            const lastOperator = newState.operators[newState.operators.length-1];
            switch ( payload.operator ) {
              case TOperators.Subtraction:
                 if (lastOperator === TOperators.Subtraction) {
                  newState.operators[newState.operators.length-1] = TOperators.Addition;
                 } else if (lastOperator === TOperators.Addition) {
                  newState.lastOperand = "-";   
                 } else {
                  newState.lastOperand = "-";
                 }
              break;
              case TOperators.Addition:
                if (lastOperator === TOperators.Subtraction) {
                  newState.operators[newState.operators.length-1] = TOperators.Subtraction;
                 } else if (lastOperator === TOperators.Addition) {
                  newState.lastOperand = "";   
                 } else {
                  newState.operators[newState.operators.length-1] = payload.operator;
                  newState.lastOperand = "";              
                 }
              break;
              default: 
                if (newState.lastOperand === '-') {

                } else {
                  newState.operators[newState.operators.length-1] = payload.operator;
                  newState.lastOperand = "";
                }
              break;
            }
          } else {
            newState.operators[newState.operators.length-1] = payload.operator;
            newState.lastOperand = "";
          }
        }
        return newState;
      },
      POP : (state:TCalculatorState, index:number) => {
        const newState = Object.assign({}, state);
        newState.operators.pop();
        newState.lastOperand = newState.operands[newState.operands.length-1].toString();
        newState.operands.pop();
        return newState;
      },
      SETLASTOPERAND : (state:TCalculatorState, operand: string) => {
        return Object.assign({}, state, { lastOperand: operand} );
      },
      APPENDTOLASTOPERAND : ( state:TCalculatorState, char: string ) => {
        return Object.assign({}, state, { lastOperand: state.lastOperand + char} );
      }      
    };
    initStore('calculator', actions, state );
};

export default configureStore;