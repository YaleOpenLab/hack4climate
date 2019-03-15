import Typography from 'typography'
import elkGlenTheme from 'typography-theme-elk-glen'
elkGlenTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  'h1,h2,h3,h4,h5': {
    marginTop: '1rem',
  }
})

const typography = new Typography(elkGlenTheme)
export default typography;