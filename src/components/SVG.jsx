import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import Node from './Node';

const x = 0;
const 𝚫x = 300;
const y = 0;
const 𝚫y = 100;
const r = 40;
const fill = 'gray';
const duration = 1000;

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
  { from: 'user', to: 's1', message: 'tx' },
  { from: 's1', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  { from: 'leader', to: 's1', message: 'order' },
  { from: 's1', to: 'user', message: 'order' },
  { from: 'leader', to: 'l1', message: 'block' },
  { from: 'user', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  {
    from: 'leader',
    to: 'user',
    message: 'order',
  },
  { from: 'user', to: 's1', message: 'tx' },
  { from: 's1', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  { from: 'leader', to: 's1', message: 'order' },
  { from: 's1', to: 'user', message: 'order' },
  { from: 'leader', to: 'l1', message: 'block' },
  { from: 'user', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  {
    from: 'leader',
    to: 'user',
    message: 'order',
  },
  { from: 'user', to: 's1', message: 'tx' },
  { from: 's1', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  { from: 'leader', to: 's1', message: 'order' },
  { from: 's1', to: 'user', message: 'order' },
  { from: 'leader', to: 'l1', message: 'block' },
  { from: 'user', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  {
    from: 'leader',
    to: 'user',
    message: 'order',
  },
  { from: 'user', to: 's1', message: 'tx' },
  { from: 's1', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  { from: 'leader', to: 's1', message: 'order' },
  { from: 's1', to: 'user', message: 'order' },
  { from: 'leader', to: 'l1', message: 'block' },
  { from: 'user', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  {
    from: 'leader',
    to: 'user',
    message: 'order',
  },
  { from: 'user', to: 's1', message: 'tx' },
  { from: 's1', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  { from: 'leader', to: 's1', message: 'order' },
  { from: 's1', to: 'user', message: 'order' },
  { from: 'leader', to: 'l1', message: 'block' },
  { from: 'user', to: 'leader', message: 'tx' },
  { from: 'leader', to: 's4', message: 'order' },
  {
    from: 'leader',
    to: 'user',
    message: 'order',
  },
];

const SVG = () => {
  const [currentIndex, setCurrentIndex] =
    useState(0);
  const animateMotionRef = useRef(null);

  useEffect(() => {
    // Restart the animation
    const animateMotionElement =
      animateMotionRef.current;
    if (animateMotionElement) {
      animateMotionElement.beginElement();
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % logs.length
      );
    }, duration); // Adjust interval as needed

    return () => clearInterval(interval);
  }, []);

  const currentLog = logs[currentIndex];
  const dynPathData = `M ${
    params[currentLog.from].x + r
  },${params[currentLog.from].y + r} ${
    params[currentLog.to].x + r
  },${params[currentLog.to].y + r}`;
  const animationKey = `path-${currentIndex}`;
  const message = currentLog.message;

  return (
    <svg
      width='100%'
      height='80%'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        id={animationKey}
        d={dynPathData}
        fill='none'
        // stroke='red'
        strokeWidth='2'
      />
      {message === 'tx' && (
        <g transform='translate(-20, -20) scale(2)'>
          <path
            fillRule='evenodd'
            d={`M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-6a.75.75 0 0 1 .75.75v.316a3.78 3.78 0 0 1 1.653.713c.426.33.744.74.925 1.2a.75.75 0 0 1-1.395.55 1.35 1.35 0 0 0-.447-.563 2.187 2.187 0 0 0-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 1 1-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 1 1 1.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 0 1-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 0 1 1.653-.713V4.75A.75.75 0 0 1 10 4Z`}
            clipRule='evenodd'
          />
          <animateMotion
            ref={animateMotionRef}
            dur={`${duration / 1000}s`}
            key={currentIndex}
          >
            <mpath href={`#${animationKey}`} />
          </animateMotion>
        </g>
      )}
      {message === 'order' && (
        <g
          transform={`translate(-20, -20) scale(2)`}
        >
          <path
            fillRule='evenodd'
            d='M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm2.25 8.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 3a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z'
            clipRule='evenodd'
          />
          <animateMotion
            ref={animateMotionRef}
            dur={`${duration / 1000}s`}
            key={currentIndex}
          >
            <mpath href={`#${animationKey}`} />
          </animateMotion>
        </g>
      )}
      {message === 'block' && (
        <g
          transform={`translate(-20, -20) scale(2)`}
        >
          <path d='M10.362 1.093a.75.75 0 0 0-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925ZM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0 0 18 14.25V6.443ZM9.25 18.693v-8.25l-7.25-4v7.807a.75.75 0 0 0 .388.657l6.862 3.786Z' />
          <animateMotion
            ref={animateMotionRef}
            dur={`${duration / 1000}s`}
            key={currentIndex}
          >
            <mpath href={`#${animationKey}`} />
          </animateMotion>
        </g>
      )}
      {/* <circle r='5' fill='red'>
        <animateMotion ref={animateMotionRef} dur='0.5s' key={currentIndex}>
          <mpath href={`#${animationKey}`} />
        </animateMotion>
      </circle> */}
      {Object.values(params).map((param) => (
        <Node key={param.id} {...param} />
      ))}
    </svg>
  );
};

export default SVG;
