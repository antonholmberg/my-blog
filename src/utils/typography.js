import Typography from 'typography';
import elkGlen from 'typography-theme-elk-glen';

elkGlen.overrideStyles = () => ({
  h1: {
    color: 'white',
  },
  a: {
    color: 'var(--accentColor)',
    textShadow: 'none',
  },
  'a:visited': {
    color: 'var(--accentColor)',
    textShadow: 'none',
  },
  h2: {
    color: 'var(--accentColor)',
  },
  h3: {
    marginBlockStart: '1rem',
    marginBlockEnd: '1rem',
    color: 'var(--accentColor)',
  },
});
const typography = new Typography(elkGlen);

export default typography;
