import React from 'react';
import { Node } from './ Node';

const SVG = () => {
  return (
    <svg
      viewBox='0 0 400 400'
      width='100%'
      height='100%'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Node
        defaultTimeout={100}
        heartbeat={true}
        x={0}
        y={150}
        r={20}
        fill='magenta'
        text='U'
      />
      <Node defaultTimeout={100} x={200} y={50} r={20} fill='blue' text='S1' />
      <Node
        defaultTimeout={100}
        x={200}
        y={100}
        r={20}
        fill='green'
        text='S2'
      />
      <Node defaultTimeout={100} x={400} y={150} r={20} fill='grey' text='S5' />
      <Node
        defaultTimeout={100}
        x={200}
        y={200}
        r={20}
        fill='orange'
        text='S3'
      />
      <Node defaultTimeout={100} x={200} y={250} r={20} fill='red' text='S4' />
      <Node
        defaultTimeout={100}
        x={550}
        y={150}
        r={20}
        fill='purple'
        text='L1'
      />
    </svg>
  );
};

export default SVG;
