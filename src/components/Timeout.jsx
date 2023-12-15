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

export const Timeout = ({ defaultTimeout, heartbeat }) => {
  const [timeout, setTimeout] = useState(defaultTimeout);

  useEffect(() => {
    const identifier = setInterval(() => {
      if (timeout > 0) {
        setTimeout((prevState) => prevState - 1);
      } else {
        setTimeout(timeout);
      }
    }, 100);
    return () => {
      clearInterval(identifier);
    };
  }, [timeout]);

  useEffect(() => {
    if (heartbeat) setTimeout(defaultTimeout);
  }, [heartbeat]);

  const width = 100;
  const stokeWidth = 15;
  const r = width / 2 - stokeWidth / 2;
  const strokeDasharray = 2 * Math.PI * r;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * timeout) / 100;
  // console.log(strokeDashoffset);
  const strokeColor = getColorFromPercentage(timeout);

  return (
    <svg
      viewBox={`0 0 ${width} ${width}`}
      width={`${width}px`}
      height={`${width}px`}
    >
      <circle
        cx={width / 2}
        cy={width / 2}
        strokeWidth={`${stokeWidth}px`}
        r={r}
        fill='none'
        stroke={strokeColor}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset.toString()}
        transform={`rotate(-90 ${width / 2} ${width / 2})`}
      />
    </svg>
  );
};
