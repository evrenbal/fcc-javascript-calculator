import classes from './Calculator.module.scss';

export enum TOperators {
  Percent = 1,
  Addition,
  Subtraction,
  Multiplication,
  Division,
}

export const operators:Map<TOperators,string> =  new Map([
  [TOperators.Addition, '+' ],
  [TOperators.Subtraction, '-' ],
  [TOperators.Multiplication, 'x' ],
  [TOperators.Division, '/' ],
  [TOperators.Percent, '%' ]
]);


export enum TActions {
  Clear = 1,
  Back,
  Decimal,
  Evaluate
}

export enum TKeyTypes {
  Number = 1,
  Operator,
  Action,
}

export type TKey = {
  id: string,
  caption: string,
  type: TKeyTypes,
  value: TOperators | TActions | number,
  keyCode?: string[],
  keyStr?: string[],
  className?: string
}


export const Keys:TKey[] = [
  {
    id: "percentage",
    caption: "%",
    type: TKeyTypes.Operator,
    value: TOperators.Percent,
    keyStr: ["%"],
  },
  {
    id: "clear",
    caption: "AC",
    type: TKeyTypes.Action,
    value: TActions.Clear,
    keyCode: ["Delete", "Escape"]
  },
  {
    id: "back",
    type: TKeyTypes.Action,
    value: TActions.Back,
    caption: "⇦",
    keyCode: ["Backspace"],
  },
  {
    id: "divide",
    caption: "÷",
    type: TKeyTypes.Operator,
    value: TOperators.Division,
    keyStr: ["/"]
  },
  {
    id: "seven",
    caption: "7",
    type: TKeyTypes.Number,
    value: 7,
    keyStr: ["7"]
  },
  {
    id: "eight",
    caption: "8",
    type: TKeyTypes.Number,
    value: 8,
    keyStr: ["8"]
  },
  {
    id: "nine",
    caption: "9",
    type: TKeyTypes.Number,
    value: 9,
    keyStr: ["9"]
  },
  {
    id: "multiply",
    caption: "x",
    type: TKeyTypes.Operator,
    value: TOperators.Multiplication,
    keyStr: ["*","x","X"]
  },
  {
    id: "four",
    caption: "4",
    type: TKeyTypes.Number,
    value: 4,
    keyStr: ["4"]
  },
  {
    id: "five",
    caption: "5",
    type: TKeyTypes.Number,
    value: 5,
    keyStr: ["5"]
  },
  {
    id: "six",
    caption: "6",
    type: TKeyTypes.Number,
    value: 6,
    keyStr: ["6"]
  },
  {
    id: "subtract",
    caption: "-",
    type: TKeyTypes.Operator,
    value: TOperators.Subtraction,
    keyStr: ["-"]
  },
  {
    id: "one",
    caption: "1",
    type: TKeyTypes.Number,
    value: 1,
    keyStr: ["1"]
  },
  {
    id: "two",
    caption: "2",
    type: TKeyTypes.Number,
    value: 2,
    keyStr: ["2"]
  },
  {
    id: "three",
    caption: "3",
    type: TKeyTypes.Number,
    value: 3,
    keyStr: ["3"]
  },
  {
    id: "add",
    caption: "+",
    type: TKeyTypes.Operator,
    value: TOperators.Addition,
    keyStr: ["+"]
  },
  {
    id: "zero",
    caption: "0",
    type: TKeyTypes.Number,
    value: 0,
    keyStr: ["0"],
    className: classes["button-span-2"]
  },
  {
    id: "decimal",
    caption: ".",
    type: TKeyTypes.Action,
    value: TActions.Decimal,
    keyCode: ["NumpadDecimal"],   
    keyStr: [".", ","]
  },
  {
    id: "equals",
    caption: "=",
    type: TKeyTypes.Action,
    value: TActions.Evaluate,
    keyStr: ["="],
    keyCode: ["Enter", "NumpadEnter"]
  },  
];
