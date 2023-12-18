import React, { useEffect, useRef, useState } from 'react';
import { Node } from './Node';

const x = 0;
const 𝚫x = 300;
const y = 0;
const 𝚫y = 200;
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

const SVG = ({ txSentTo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dynSrc, setDynSrc] = useState({
    cx: params[logs[0].from].x + r,
    cy: params[logs[0].from].y + r,
  });
  const [dynDest, setDynDest] = useState({
    cx: params[logs[0].to].x + r,
    cy: params[logs[0].to].y + r,
  });

  const [dynPathData, setDynPathData] = useState(
    `M ${dynSrc.cx},${dynSrc.cy} ${dynDest.cx},${dynDest.cy}`
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % logs.length;
        setDynSrc({
          cx: params[logs[nextIndex].from].x + r,
          cy: params[logs[nextIndex].from].y + r,
        });
        setDynDest({
          cx: params[logs[nextIndex].to].x + r,
          cy: params[logs[nextIndex].to].y + r,
        });
        setDynPathData(
          `M ${dynSrc.cx},${dynSrc.cy}  ${dynDest.cx},${dynDest.cy}`
        );
        console.log(dynPathData);
        return nextIndex;
      });
    }, 500); // Change the interval as needed

    return () => clearInterval(interval);
  }, []);

  const animationKey = `path-${dynSrc.cx}-${dynSrc.cy}-${dynDest.cx}-${dynDest.cy}`;

  return (
    <>
      <svg width='100%' height='80%' xmlns='http://www.w3.org/2000/svg'>
        <path id={animationKey} d={dynPathData} fill='none' strokeWidth='2' />
        <circle r='5' fill='red'>
          <animateMotion dur='0.5s'>
            <mpath href={`#${animationKey}`} />
          </animateMotion>
        </circle>
        <Node {...params.user} />
        <Node {...params.s1} />
        <Node {...params.s2} />
        <Node {...params.leader} />
        <Node {...params.s3} />
        <Node {...params.s4} />
        <Node {...params.l1} />
      </svg>
    </>
  );
};

export default SVG;
