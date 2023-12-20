import React, { useEffect, useRef, useState } from 'react';
import Node from './Node';

const x = 0;
const 𝚫x = 300;
const y = 0;
const 𝚫y = 100;
const r = 40;
const fill = 'gray';

const params = {
  user: {
    id: 'user',
    x: x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: fill,
    text: 'u',
  },
  s1: {
    id: 's1',
    x: x + 𝚫x,
    y: y,
    r: r,
    fill: fill,
    text: 's1',
  },
  s2: {
    id: 's2',
    x: x + 𝚫x,
    y: y + 𝚫y,
    r: r,
    fill: fill,
    text: 's2',
  },
  leader: {
    id: 'leader',
    x: x + 2 * 𝚫x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: fill,
    text: 'leader',
  },
  s3: {
    id: 's3',
    x: x + 𝚫x,
    y: y + 3 * 𝚫y,
    r: r,
    fill: fill,
    text: 's3',
  },
  s4: {
    id: 's4',
    x: x + 𝚫x,
    y: y + 4 * 𝚫y,
    r: r,
    fill: fill,
    text: 's4',
  },
  l1: {
    id: 'l1',
    x: x + 3 * 𝚫x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: fill,
    text: 'l1',
  },
};

const logs = [
  { from: 'user', to: 's1' },
  { from: 's1', to: 'leader' },
  { from: 'leader', to: 's4' },
  { from: 'leader', to: 's1' },
  { from: 's1', to: 'user' },
  { from: 'leader', to: 'l1' },
  { from: 'user', to: 'leader' },
  { from: 'leader', to: 's4' },
  { from: 'leader', to: 'user' },
];

const SVG = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logs.length);
    }, 500); // Adjust interval as needed

    return () => clearInterval(interval);
  }, []);

  const currentLog = logs[currentIndex];
  const dynPathData = `M ${params[currentLog.from].x + r},${
    params[currentLog.from].y + r
  } ${params[currentLog.to].x + r},${params[currentLog.to].y + r}`;

  return (
    <svg width='100%' height='80%' xmlns='http://www.w3.org/2000/svg'>
      <path
        id={`path-${currentIndex}`}
        d={dynPathData}
        fill='none'
        stroke='red'
        strokeWidth='2'
      />
      <circle r='5' fill='red'>
        <animateMotion dur='0.5s' key={currentIndex}>
          <mpath href={`#path-${currentIndex}`} />
        </animateMotion>
      </circle>
      {Object.values(params).map((param) => (
        <Node key={param.id} {...param} />
      ))}
    </svg>
  );
};

export default SVG;
