import {useLayoutEffect, useRef, useState} from 'react'
import classes from './Display.module.scss';

type TDisplay = {
  rowTopText: string,
  rowBottomText: string
}

type TMaxLength = {
  first:number|null,
  second: number|null 
}

const Display:React.FC<TDisplay> = (props) => {

  const rowTopContainer = useRef<HTMLDivElement>(null);
  const rowTopInner = useRef<HTMLDivElement>(null);
  const [ maxLength, setMaxLength] = useState<TMaxLength>( {first: null, second: null} );

  const {rowTopText, rowBottomText} = props;

  const isBigEnough = () => {
    if (rowTopInner.current && rowTopContainer.current) {
      return {
        isHeightEnough : rowTopInner.current.clientHeight <= rowTopContainer.current.clientHeight,
        isWidthEnough : rowTopInner.current.clientWidth <= rowTopContainer.current.clientWidth
      }
    }
    return {isHeightEnough: false, isWidthEnough: false}
  }

  useLayoutEffect( () => {
    const {isHeightEnough, isWidthEnough} = isBigEnough();
    /* We already passed the biggest font size */
    if (maxLength.first != null ) 
    {
      if (maxLength.second != null) {
        if (rowTopText.length < maxLength.first)
          setMaxLength( { first:null, second: null} );
        else if (rowTopText.length < maxLength.second) {
          setMaxLength( { first: maxLength.first, second: null} );
        }
      }
      else if ( ! isHeightEnough || ! isWidthEnough ) {
        setMaxLength( {first: maxLength.first, second :rowTopText.length - 1} );
      }
    } else if ( ! isHeightEnough || ! isWidthEnough ) {
      setMaxLength( {first: rowTopText.length - 1, second: null} );
    }
  }, [rowTopText, rowTopContainer, rowTopInner, maxLength] );

  const rowTopClass = (
    maxLength.second !==null && rowTopText.length > maxLength.second ? classes.smallest :
    maxLength.first !== null && rowTopText.length > maxLength.first ? classes.smaller : ''
  );

  return (
    <div className={classes.display}>
      { rowTopText.length === 0 && 
        <div className={classes.default}>
          Click the buttons below or press the associated key on your keyboard.
       </div>
      }
      <div className={`${classes.rowTop} ${rowTopClass}`} ref={rowTopContainer}>
        <div id="display" ref={rowTopInner}>
          {rowTopText}
        </div>        
      </div>
      <div className={classes.rowBottom}>{rowBottomText}</div>
    </div>
);
}

export default Display