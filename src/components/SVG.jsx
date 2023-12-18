import React, { useRef, useState } from 'react';
import { Node } from './Node';

const x = 0;
const 𝚫x = 300;
const y = 0;
const 𝚫y = 200;
const r = 40;
const fill = 'gray';

const params = [
  {
    id: 'user',
    defaultTimeout: 100,
    heartbeat: true,
    x: x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: fill,
    text: 'u',
  },
  {
    id: 's1',
    defaultTimeout: 100,
    heartbeat: true,
    x: x + 𝚫x,
    y: y,
    r: r,
    fill: fill,
    text: 's1',
  },
  {
    id: 's2',
    defaultTimeout: 100,
    heartbeat: true,
    x: x + 𝚫x,
    y: y + 𝚫y,
    r: r,
    fill: fill,
    text: 's2',
  },
  {
    id: 'leader',
    defaultTimeout: 100,
    heartbeat: true,
    x: x + 2 * 𝚫x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: fill,
    text: 'leader',
  },
  {
    id: 's3',
    defaultTimeout: 100,
    heartbeat: true,
    x: x + 𝚫x,
    y: y + 3 * 𝚫y,
    r: r,
    fill: fill,
    text: 's3',
  },
  {
    id: 's4',
    defaultTimeout: 100,
    heartbeat: true,
    x: x + 𝚫x,
    y: y + 4 * 𝚫y,
    r: r,
    fill: fill,
    text: 's4',
  },
  {
    id: 'l1',
    defaultTimeout: 100,
    heartbeat: true,
    x: x + 3 * 𝚫x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: fill,
    text: 'l1',
  },
];
params;

const SVG = ({ txSentTo }) => {
  const [lineCoords, setLineCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [animate, setAnimate] = useState(false);
  const svg1Ref = useRef();
  const svg2Ref = useRef();

  const handleButtonClick = () => {
    const svg1 = svg1Ref.current.getBoundingClientRect();
    const svg2 = svg2Ref.current.getBoundingClientRect();

    setLineCoords({
      x1: svg1.x + svg1.width / 2,
      y1: svg1.y + svg1.height / 2,
      x2: svg2.x + svg2.width / 2,
      y2: svg2.y + svg2.height / 2,
    });

    setAnimate(true);
  };

  const [source] = useState({ cx: params[0].x + r, cy: params[0].y + r });
  const [destination] = useState({ cx: params[1].x + r, cy: params[1].y + r });
  const pathData = `M ${source.cx},${source.cy} ${destination.cx},${destination.cy}`;

  return (
    <>
      <svg width='100%' height='80%' xmlns='http://www.w3.org/2000/svg'>
        <path
          id='transactionPath'
          d={pathData}
          fill='none'
          stroke='none'
          strokeWidth='2'
        />
        <circle r='5' fill='red'>
          <animateMotion dur='0.5s' repeatCount='indefinite'>
            <mpath href='#transactionPath' />
          </animateMotion>
        </circle>

        <Node id='svg1' forwardRef={svg1Ref} {...params[0]} />
        <Node id='svg2' forwardRef={svg2Ref} {...params[1]} />
        <Node {...params[2]} />
        <Node {...params[3]} />
        <Node {...params[4]} />
        <Node {...params[5]} />
        <Node {...params[6]} />
      </svg>
      <button onClick={handleButtonClick}>Animate Transaction</button>
    </>
  );
};

export default SVG;
