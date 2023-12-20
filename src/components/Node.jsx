import React from 'react';
import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const Node = React.memo(({ x, y, r, fill, text }) => {
  const width = 2 * r;

  return (
    <svg width={`${width}px`} height={`${width}px`} x={x} y={y}>
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
});

export default Node;
