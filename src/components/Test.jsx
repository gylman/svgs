import React from 'react';

const Test = () => {
  return (
    <svg width='200' height='200' xmlns='http://www.w3.org/2000/svg'>
      <path id='motionPath' d='M10,10 Q100,15 190,10 T380,10' fill='none' stroke='lightgrey' />

      <circle r='5' fill='blue'>
        <animateMotion dur='4s' repeatCount='indefinite'>
          <mpath href='#motionPath' />
        </animateMotion>
      </circle>
    </svg>
  );
};

export default Test;
