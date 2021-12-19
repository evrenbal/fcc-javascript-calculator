import {useState} from 'react';
import Calculator from 'components/Calculator';
import ThemeSelector from 'components/ThemeSelector';
import About from 'components/About';

import classes from './App.module.scss';
import 'font-awesome/css/font-awesome.min.css';

function App() {

  const [theme, setTheme] = useState('color1');

  const handleThemeChange = (theme:string) => {
    setTheme(theme);
  }

  return (
    <div className={classes.app}>
      <About />
      <ThemeSelector onThemeChange={handleThemeChange}/>
      <Calculator className={`backdrop ${theme}`}/>
    </div>
  );
}

export default App;
