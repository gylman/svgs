import React from 'react';

const Circle = ({ color, motionPath, duration, isReversed }) => {
  return (
    <circle r='5' fill={color}>
      {isReversed ? (
        <animateMotion dur={`${duration}ms`} repeatCount='indefinite' keyPoints='1;0' keyTimes='0;1'>
          <mpath href={`#${motionPath}`} />
        </animateMotion>
      ) : (
        <animateMotion dur={`${duration}ms`} repeatCount='indefinite'>
          <mpath href={`#${motionPath}`} />
        </animateMotion>
      )}
    </circle>
  );
};

export default Circle;
