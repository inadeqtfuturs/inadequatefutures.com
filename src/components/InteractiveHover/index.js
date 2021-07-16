import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import rangeParser from 'parse-numeric-range';

function InteractiveHover({ id, index, ...props }) {
  const triggerRef = useRef(null);

  React.useEffect(() => {
    const trigger = triggerRef.current;

    const codeBlock = document.getElementById(id);
    if (!codeBlock) return;

    const allHighlightWords = codeBlock.querySelectorAll('.highlight-word');
    const targetIndex = rangeParser(index).map((i) => i - 1);
    if (Math.max(...targetIndex) >= allHighlightWords.length) return;

    const addClass = () => targetIndex.forEach((i) => allHighlightWords[i].classList.add('on'));
    const removeClass = () =>
      targetIndex.forEach((i) => allHighlightWords[i].classList.remove('on'));

    trigger.addEventListener('mouseenter', addClass);
    trigger.addEventListener('mouseleave', removeClass);

    // eslint-disable-next-line consistent-return
    return () => {
      trigger.removeEventListener('mouseenter', addClass);
      trigger.removeEventListener('mouseleave', removeClass);
    };
  }, []);

  return <code ref={triggerRef} {...props} />;
}

InteractiveHover.propTypes = {
  id: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
};

export default InteractiveHover;