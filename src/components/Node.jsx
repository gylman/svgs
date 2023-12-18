import React from 'react';
import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Define the keyframes for the stroke color change
/* const strokeChange = keyframes`
  0%   { stroke: green; }
  50% { stroke: yellow; }
  100% { stroke: red; }
`;
const changingPatience = css`
  ${strokeChange} 3s linear infinite;
`;
const Timeout = styled.circle`
  animation: ${changingPatience};
`;
 */

export const Node = ({ x, y, r, fill, text, forwardRef }) => {
  const width = 2 * r;

  return (
    <svg
      width={`${width}px`}
      height={`${width}px`}
      x={x}
      y={y}
      ref={forwardRef}
    >
      <circle cx={r} cy={r} r={r} fill={fill} />
      {/* <text
        x={x - r / 2}
        y={y + 7}
        fontFamily='Arial'
        fontSize={r}
        fill='white'
      >
        {text}
      </text> */}
    </svg>
  );
};
