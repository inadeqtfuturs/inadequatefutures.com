import React from 'react';
import PropTypes from 'prop-types';

function Code({ children, id }) {
  return (
    <code id={id}>{children}</code>
  );
}

Code.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.any
};

Code.defaultProps = {
  id: null
};

export default Code;
