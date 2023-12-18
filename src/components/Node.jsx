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
function getColorFromPercentage(percentage) {
  // Normalize the percentage to a 0-100 range
  const hue = 120 * (percentage / 100);
  // Return the RGB color string
  return `hsl(${hue}, 100%, 50%)`;
}

export const Node = ({ defaultTimeout, heartbeat, x, y, r, fill, text }) => {
  const [timeout, setTimeout] = useState(defaultTimeout);

  useEffect(() => {
    const identifier = setInterval(() => {
      if (timeout > 0) {
        setTimeout((prevState) => prevState - 1);
      } else {
        setTimeout(defaultTimeout);
      }
    }, 100);
    return () => {
      clearInterval(identifier);
    };
  }, [timeout]);

  useEffect(() => {
    if (heartbeat) setTimeout(defaultTimeout);
  }, [heartbeat]);

  const strokeWidth = 4;
  const width = 2 * r + strokeWidth;
  const strokeDasharray = 2 * Math.PI * r;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * timeout) / 100;
  const strokeColor = getColorFromPercentage(timeout);

  return (
    <svg width={`${width}px`} height={`${width}px`} x={x} y={y}>
      {/* The timeout bar */}
      <circle
        cx={width / 2}
        cy={width / 2}
        strokeWidth={`${strokeWidth}px`}
        r={r}
        fill={fill}
        stroke={strokeColor}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset.toString()}
        transform={`rotate(-90 ${width / 2} ${width / 2})`}
      />
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
