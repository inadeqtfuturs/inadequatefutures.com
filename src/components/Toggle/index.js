import React, { useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import { styled, darkTheme } from '@stitches';

const Button = styled('button', {
  position: 'absolute',
  top: '10px',
  left: '10px'
});

function Toggle() {
  const { toggleMode } = useContext(ThemeContext);
  return (
    <Button type="button" onClick={() => toggleMode()}>toggle</Button>
  );
}

export default Toggle;
