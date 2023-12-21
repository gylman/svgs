const x = 0;
const 𝚫x = 300;
const y = 0;
const 𝚫y = 100;
const r = 40;
const fill = 'gray';

export const logs = [
  {
    from: 'user',
    to: 's1',
    message: 'tx',
    role: 'follower',
  },
  {
    from: 's1',
    to: 'leader',
    message: 'tx',
    role: 'follower',
  },
  {
    from: 'leader',
    to: 's4',
    message: 'order',
    role: 'follower',
  },
  {
    from: 'leader',
    to: 's1',
    message: 'order',
    role: 'follower',
  },
  {
    from: 's1',
    to: 'user',
    message: 'order',
    role: 'follower',
  },
];

export const initialParams = {
  user: {
    id: 'user',
    x: x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: fill,
    role: 'follower',
    text: 'u',
  },
  s1: {
    id: 's1',
    x: x + 𝚫x,
    y: y,
    r: r,
    fill: fill,
    role: 'follower',
    text: 's1',
  },
  s2: {
    id: 's2',
    x: x + 𝚫x,
    y: y + 𝚫y,
    r: r,
    fill: fill,
    role: 'follower',
    text: 's2',
  },
  leader: {
    id: 'leader',
    x: x + 2 * 𝚫x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: fill,
    role: 'follower',
    text: 'leader',
  },
  s3: {
    id: 's3',
    x: x + 𝚫x,
    y: y + 3 * 𝚫y,
    r: r,
    fill: fill,
    role: 'follower',
    text: 's3',
  },
  s4: {
    id: 's4',
    x: x + 𝚫x,
    y: y + 4 * 𝚫y,
    r: r,
    fill: fill,
    role: 'follower',
    text: 's4',
  },
  l1: {
    id: 'l1',
    x: x + 3 * 𝚫x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: fill,
    role: 'follower',
    text: 'rollup',
  },
};
