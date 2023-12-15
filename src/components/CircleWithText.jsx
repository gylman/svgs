import React from 'react';
import styled from 'styled-components';

const CircleWithText = ({ cx, cy, r, fill, text }) => {
  const yCoord = cy + 10;
  console.log(yCoord);
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <text
        x={cx - r / 2}
        y={cy + 7}
        fontFamily='Arial'
        fontSize={r}
        fill='white'
      >
        {text}
      </text>
    </>
  );
};

export default CircleWithText;
