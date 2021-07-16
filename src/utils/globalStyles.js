import { global } from '@stitches';

const defaultTextBase = {
  fontFamily: '$body',
  lineHeight: 1.5,
  margin: 0,
  padding: 0,
  marginBottom: '$4',
  fontSize: '$sm',
};

const defaultHeadingBase = {
  fontFamily: '$heading',
  margin: 0,
  lineHeight: 1,
  fontWeight: 'normal',
  marginBottom: '$3'
};

const globalStyles = global({
  '*': {
    boxSizing: 'border-box'
  },
  body: {
    margin: 0,
    color: '$text',
    background: '$background',
    '*::selection': {
      background: '$turquoise'
    },
    '*::-moz-selection': {
      background: '$turquoise'
    }
  },
  p: { ...defaultTextBase },
  span: { ...defaultTextBase },
  a: { 
    ...defaultTextBase,
    color: '$gray600',
    textDecorationColor: '$gray300',
    textDecorationLine: 'underline',
    textUnderlineOffset: '3px',
    '&:hover, &:focus': {
      color: '$text',
      textDecorationColor: '$gray600',
    }
  },
  // footnotes
  'sup a': {
    fontSize: '$2half',
    textDecoration: 'none'
  },
  'a.footnote-backref': {
    textDecoration: 'none',
    paddingLeft: '$1'
  },
  ul: {
    ...defaultTextBase,
    paddingLeft: '$8',
    'ul': {
      margin: 0
    }
  },
  ol: {
    ...defaultTextBase,
    paddingLeft: '$8'
  },
  h1: {
    ...defaultHeadingBase,
    fontSize: '$3xl'
  },
  h2: {
    ...defaultHeadingBase,
    fontSize: '$2xl'
  },
  h3: {
    ...defaultHeadingBase,
    fontSize: '$xl'
  },
  h4: {
    ...defaultHeadingBase,
    fontSize: '$md'
  },
  h5: {
    ...defaultHeadingBase,
    fontSize: '$sm',
    lineHeight: 1.25
  },
  h6: {
    ...defaultHeadingBase,
    fontSize: '$xs',
    lineHeight: 1.2
  },
});

export default globalStyles;