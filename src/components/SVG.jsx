import React from 'react';
import { Node } from './Node';

const x = 0;
const 𝚫x = 200;
const y = 0;
const 𝚫y = 100;
const r = 20;
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
    r: 20,
    fill: fill,
    text: 'l1',
  },
];
params;

const SVG = () => {
  return (
    <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
      <Node {...params[0]} />
      <Node {...params[1]} />
      <Node {...params[2]} />
      <Node {...params[3]} />
      <Node {...params[4]} />
      <Node {...params[5]} />
      <Node {...params[6]} />
    </svg>
  );
};

export default SVG;
