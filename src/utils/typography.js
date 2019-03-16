import Typography from 'typography';
import elkGlen from 'typography-theme-elk-glen';
import theme from '../theme';

elkGlen.overrideStyles = ({ adjustFontSizeTo, rhythm }, options, styles) => ({
  h1: {
    color: 'white',
  },
  a: {
    color: theme.colors.accentColor,
    textShadow: 'none',
  },
  'a:visited': {
    color: theme.colors.accentColor,
    textShadow: 'none',
  },
  h2: {
    color: theme.colors.accentColor,
  },
  h3: {
    marginBlockStart: '1rem',
    marginBlockEnd: '1rem',
    color: theme.colors.accentColor,
  },
});
const typography = new Typography(elkGlen);

export default typography;
