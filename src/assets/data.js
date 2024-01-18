const x = 0;
const 𝚫x = 300;
const y = 0;
const 𝚫y = 100;
const r = 40;
const fill = 'gray';

export const dbData = [
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
    from: 'u',
    fid: '0x2',
    to: 'l',
    tid: '0xE',
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
    to: 'r0',
    tid: '0xY',
    data: 'block',
  },
  {
    from: 'l',
    fid: '0xE',
    to: 'r1',
    tid: '0xZ',
    data: 'block',
  },
  {
    from: 'l',
    fid: '0xE',
    to: 'f3',
    tid: '0xD',
    data: 'lc',
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

const paths = {
  uf0: 'M137 170V86C137 72.1929 148.193 61 162 61H378',
  f0u: 'M137 170V86C137 72.1929 148.193 61 162 61H378',
  uf1: 'M137 170V162C137 148.193 148.193 137 162 137H378',
  f1u: 'M137 170V162C137 148.193 148.193 137 162 137H378',
  f2u: 'M137 246V254C137 267.807 148.193 279 162 279H378',
  uf2: 'M137 246V254C137 267.807 148.193 279 162 279H378',
  uf3: 'M137 246V330C137 343.807 148.193 355 162 355H378',
  f3u: 'M137 246V330C137 343.807 148.193 355 162 355H378',

  ul: 'M176 208L662 208',
  lu: 'M176 208L662 208',

  f0l: 'M701 170V86C701 72.1929 689.807 61 676 61H460',
  lf0: 'M701 170V86C701 72.1929 689.807 61 676 61H460',
  f1l: 'M701 170V162C701 148.193 689.807 137 676 137H460',
  lf1: 'M701 170V162C701 148.193 689.807 137 676 137H460',
  f2l: 'M701 246V254C701 267.807 689.807 279 676 279H460',
  lf2: 'M701 246V254C701 267.807 689.807 279 676 279H460',
  f3l: 'M701 246V330C701 343.807 689.807 355 676 355H460',
  lf3: 'M701 246V330C701 343.807 689.807 355 676 355H460',

  lr0: 'M738 208H900.5C914.307 208 925.5 196.807 925.5 183V150.5C925.5 142.492 931.992 136 940 136V136',
  lr1: 'M738 208H900.5C914.307 208 925.5 219.193 925.5 233V265.5C925.5 273.508 931.992 280 940 280V280',
};
