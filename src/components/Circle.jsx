import React from 'react';

const Circle = ({ color, motionPath, duration, isReversed }) => {
  return (
    <circle r='5' fill={color}>
      <animateMotion
        dur={`${duration}ms`}
        repeatCount='indefinite'
        keyPoints={isReversed ? '1;0' : '0;1'}
        keyTimes='0;1'
      >
        <mpath href={`#${motionPath}`} />
      </animateMotion>
    </circle>
  );
};

export default Circle;
