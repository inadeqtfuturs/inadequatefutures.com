import React from 'react';
import PropTypes from 'prop-types';
import Code from '@components/Code';
import Pre from '@components/Pre';
// import Preview from '@components/Preview';
import InteractiveHover from '@components/InteractiveHover';

const components = {
  code: ({ children, id }) => <Code id={id}>{children}</Code>,
  pre: ({ children, showLineNumbers, ...props }) => 
    <Pre showLineNumbers={showLineNumbers} {...props}>{children}</Pre>,
  InteractiveHover: ({ id, index, ...props}) =>
    <InteractiveHover id={id} index={index} {...props} />
};

components.code.propTypes = {
  children: PropTypes.any,
  id: PropTypes.any
};

components.code.defaultProps = {
  children: null,
  id: null
};

components.pre.propTypes = {
  children: PropTypes.any,
  showLineNumbers: PropTypes.bool
};

components.pre.defaultProps = {
  children: null,
  showLineNumbers: false
};

components.InteractiveHover.propTypes = {
  index: PropTypes.any,
  id: PropTypes.any
};

components.InteractiveHover.defaultProps = {
  index: null,
  id: null
};

export default components;
