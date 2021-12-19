import classes from './Button.module.scss';
import { TOperators, TActions } from './Keys' 

type TButton = {
  id: string,
  caption: string,
  isActive: boolean,
  keyCode? : string[]
  keyStr? : string[]
  className?: string
  value?: number | TOperators | TActions
  handleMouseDown: (id:string) => void;
}

const Button: React.FC<TButton> = (props) => {
  
  const handleMouseDown:React.MouseEventHandler = (e:React.MouseEvent) => {
    props.handleMouseDown(props.id)
    document.addEventListener("mouseup", function() {
      props.handleMouseDown("")
    }, {once : true});        
  };

  return (
    <div className={`${classes["button-container"]} ${props.className ?? '' } ${ props.isActive ? classes.active : '' }`}>
      <button id={props.id} className={classes.button} onClick={handleMouseDown}>
        {props.caption}
      </button>
    </div>      
  )
}

export default Button;