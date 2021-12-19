const ThemeSelector: React.FC<{ onThemeChange:(val:string) => void }> = (props) => {
  return (
    <div className="theme-selector">
      <ThemeButton className="color1" onThemeChange={props.onThemeChange} />
      <ThemeButton className="color2" onThemeChange={props.onThemeChange} />
      <ThemeButton className="color3" onThemeChange={props.onThemeChange} />
      <ThemeButton className="color4" onThemeChange={props.onThemeChange} />
      <ThemeButton className="color5" onThemeChange={props.onThemeChange} />
      <ThemeButton className="color6" onThemeChange={props.onThemeChange} />
      <ThemeButton className="color7" onThemeChange={props.onThemeChange} />
      <ThemeButton className="color8" onThemeChange={props.onThemeChange} />
    </div>
  )
}

const ThemeButton:React.FC<{className: string, onThemeChange: (val:string) => void}> = (props) => {
  
  const handleOnClick = () => {
    props.onThemeChange(props.className);
  }
  
  return <div className={props.className} onClick={handleOnClick}></div>
  
}

export default ThemeSelector;