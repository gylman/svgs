import React from 'react';
import CircleWithText from './CircleWithText';

const SVG = () => {
  return (
    <svg
      viewBox='0 0 700 700'
      width='100%'
      height='100%'
      xmlns='http://www.w3.org/2000/svg'
    >
      <CircleWithText cx={0} cy={150} r={20} fill='magenta' text='U' />
      <CircleWithText cx={200} cy={50} r={20} fill='blue' text='S1' />
      <CircleWithText cx={200} cy={100} r={20} fill='green' text='S2' />
      <CircleWithText cx={400} cy={150} r={20} fill='grey' text='S5' />
      <CircleWithText cx={200} cy={200} r={20} fill='orange' text='S3' />
      <CircleWithText cx={200} cy={250} r={20} fill='red' text='S4' />
      <CircleWithText cx={550} cy={150} r={20} fill='purple' text='L1' />
    </svg>
  );
};

export default SVG;
