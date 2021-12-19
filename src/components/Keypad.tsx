import { useEffect, useState } from 'react';
import Button from 'components/Button';
import { TActions, TOperators, TKey, TKeyTypes, Keys } from './Keys';
import classes from './Calculator.module.scss';

type TKeyPad = {
  handleNumbers : (val:number) => void
  handleActions : (action:TActions) => void
  handleOperators : (operator:TOperators) => void
}

const KeyPad:React.FC<TKeyPad> = (props) => {
 
  const [activeKey, setActiveKey] = useState("");

  const handleButtonPress = (aKey:TKey) => {
    switch (aKey.type)
    {
      case TKeyTypes.Number:
        props.handleNumbers( aKey.value ) ;
      break;
      case TKeyTypes.Operator:
        props.handleOperators( aKey.value )
      break;
      case TKeyTypes.Action:
        props.handleActions( aKey.value )      
      break;
    }
  }

  const handleKeyRelease = (e:KeyboardEvent) => {
    setActiveKey("")
  };

  const handleKeyPress = (e:KeyboardEvent) => {
    const aKey = Keys.find( (key) => {
      if (! (key.keyCode || key.keyStr ) )
        return false;
      return (
        ( key.keyCode && key.keyCode.some( (keyCode) => { return e.code === keyCode} ) ) ||
        ( key.keyStr &&  key.keyStr.some( (keyStr) => { return e.key === keyStr} ) )
      );
    });
    if (aKey) 
    {
      handleButtonPress(aKey);
      setActiveKey(aKey.id);
      document.addEventListener('keyup', handleKeyRelease, {once:true});
    }
  };

  const handleMouseDown = (id:string) => {
    const aKey = Keys.find( (key) => {
      return key.id === id;
    });
    if (aKey)
    {
      handleButtonPress(aKey);
    }
    setActiveKey(id);
  };

  useEffect( () => {
    document.addEventListener('keydown', handleKeyPress );
    return () => {
      document.removeEventListener('keydown', handleKeyPress );
    };
  } );

  return (
    <div className={classes.keypad}>
      {
        Keys.map( (key) => {
          return (
            <Button
            id={key.id}
            key={key.id}
            caption={key.caption}
            value={TOperators.Percent}
            handleMouseDown={ handleMouseDown }
            isActive={key.id === activeKey}
            className={key.className}
          />
          )
        })
      }
    </div>
  );

}

export default KeyPad;