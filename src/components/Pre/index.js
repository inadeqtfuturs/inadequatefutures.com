import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@stitches';

const StyledPre = styled('pre', {
  $$background: '#2d2d2d',
  $$text: '$colors$white',
  $$syntax1: '$colors$orange',
  $$syntax2: '$colors$turquoise',
  $$syntax3: '$colors$pink',
  $$syntax4: '$colors$pink',
  $$comment: '$colors$gray300',
  $$removed: '$colors$red',
  $$added: '$colors$turquoise',

  boxSizing: 'border-box',
  padding: '$3',
  borderRadius: '$sm',
  overflow: 'auto',
  fontFamily: '$mono',
  fontSize: '$2',
  lineHeight: '$3',
  whiteSpace: 'pre-wrap',
  backgroundColor: '$$background',
  color: '$$text',

  '& > code': { display: 'block' },
  '& span': { 
    fontFamily: '$monospace',
    all: 'unset'
  },

  '.token.parameter': {
    color: '$$text',
  },

  '.token.tag, .token.class-name, .token.selector, .token.selector .class, .token.function': {
    color: '$$syntax1',
  },

  '.token.attr-value, .token.class, .token.string, .token.number, .token.unit, .token.color': {
    color: '$$syntax2',
  },

  '.token.attr-name, .token.keyword, .token.rule, .token.operator, .token.pseudo-class, .token.important': {
    color: '$$syntax3',
  },

  '.token.punctuation, .token.module, .token.property': {
    color: '$$syntax4',
  },

  '.token.comment': {
    color: '$$comment',
  },

  '.token.atapply .token:not(.rule):not(.important)': {
    color: 'inherit',
  },

  '.language-shell .token:not(.comment)': {
    color: 'inherit',
  },

  '.language-css .token.function': {
    color: 'inherit',
  },

  '.token.deleted:not(.prefix), .token.inserted:not(.prefix)': {
    display: 'block',
    px: '$4',
    mx: '-$4',
  },

  '.token.deleted:not(.prefix)': {
    color: '$$removed',
  },

  '.token.inserted:not(.prefix)': {
    color: '$$added',
  },

  '.token.deleted.prefix, .token.inserted.prefix': {
    userSelect: 'none',
  },

  '.highlight-line': {
    '&, *': {
      transition: 'color 150ms ease',
    },
    '&[data-highlighted=false]': {
      '&, *': {
        color: '$$fadedLines',
      },
    },
  },

  variants: {
    showLineNumbers: {
      true: {
        '.highlight-line': {
          position: 'relative',
          paddingLeft: '$4',

          '&::before': {
            content: 'attr(data-line)',
            position: 'absolute',
            left: -5,
            top: 0,
            color: '$$lineNumbers',
          }
        }
      }
    }
  }
});

function Pre({ children, showLineNumbers }) {
  return (
    <StyledPre showLineNumbers={showLineNumbers}>
      {children}
    </StyledPre>
  );
}

Pre.propTypes = {
  children: PropTypes.object.isRequired,
  showLineNumbers: PropTypes.bool
};

Pre.defaultProps = {
  showLineNumbers: false
};

export default Pre;
