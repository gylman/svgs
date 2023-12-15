import React from 'react';

const SVG = () => {
  return (
    <svg
      viewBox='0 0 700 700'
      width='100%'
      height='100%'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        id='transactionPath'
        d='M 20,50 Q 300,0 380,100'
        fill='none'
        stroke='red'
        strokeWidth='2'
      />

      <circle cx='20' cy='50' r='10' fill='blue' />

      <circle cx='380' cy='100' r='10' fill='green' />

      <circle r='5' fill='gold'>
        <animateMotion dur='4s' repeatCount='indefinite'>
          <mpath href='#transactionPath' />
        </animateMotion>
      </circle>
    </svg>
  );
};

export default SVG;
