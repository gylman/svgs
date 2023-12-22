const x = 0;
const 𝚫x = 300;
const y = 0;
const 𝚫y = 100;
const r = 40;
const fill = 'gray';

export const logs = [
  {
    from: 'u',
    fid: '0x0',
    to: 'f0',
    tid: '0xA',
    data: 'tx',
  },
  {
    from: 'u',
    fid: '0x1',
    to: 'f0',
    tid: '0xA',
    data: 'tx',
  },
  {
    from: 'u',
    fid: '0x2',
    to: 'f0',
    tid: '0xA',
    data: 'tx',
  },

  {
    from: 'f0',
    fid: '0xA',
    to: 'l',
    tid: '0xE',
    data: 'tx',
  },

  {
    from: 'l',
    fid: '0xE',
    to: 'f3',
    tid: '0xD',
    data: 'oc',
  },

  {
    from: 'l',
    fid: '0xE',
    to: 'f0',
    tid: '0xA',
    data: 'oc',
  },

  {
    from: 'l',
    fid: '0xE',
    to: 'f2',
    tid: '0xC',
    data: 'oc',
  },
  {
    from: 'f0',
    fid: '0xA',
    to: 'u',
    tid: '0x0',
    data: 'oc',
  },

  {
    from: 'l',
    fid: '0xE',
    to: 'f1',
    tid: '0xB',
    data: 'oc',
  },

  {
    from: 'l',
    fid: '0xE',
    to: 'r',
    tid: '0xY',
    data: 'block',
  },
  {
    from: 'l',
    fid: '0xE',
    to: 'r',
    tid: '0xZ',
    data: 'block',
  },
  {
    from: 'u',
    fid: '0x0',
    to: 'l',
    tid: '0xD',
    data: 'tx',
  },
];

export const initialParams = {
  u: {
    id: '0x0',
    x: x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: 'lightgreen',
    role: 'u',
  },
  f0: {
    id: '0xA',
    x: x + 𝚫x,
    y: y,
    r: r,
    fill: fill,
    role: 'f0',
  },
  f1: {
    id: '0xB',
    x: x + 𝚫x,
    y: y + 𝚫y,
    r: r,
    fill: fill,
    role: 'f1',
  },
  f2: {
    id: '0xC',
    x: x + 𝚫x,
    y: y + 3 * 𝚫y,
    r: r,
    fill: fill,
    role: 'f2',
  },
  f3: {
    id: '0xD',
    x: x + 𝚫x,
    y: y + 4 * 𝚫y,
    r: r,
    fill: fill,
    role: 'f3',
  },
  l: {
    id: '0xE',
    x: x + 2 * 𝚫x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: 'lightblue',
    role: 'l',
  },
  r: {
    id: '0xY',
    x: x + 3 * 𝚫x,
    y: y + 2 * 𝚫y,
    r: r,
    fill: 'lightpink',
    role: 'r',
  },
};
