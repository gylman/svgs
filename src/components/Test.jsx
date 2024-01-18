import React, { useEffect, useRef, useState } from 'react';
import { dbData } from '../assets/data';
import Defs from './Defs';
import U from './U';
import F1 from './F1';
import F2 from './F2';
import F3 from './F3';
import L from './L';
import F0 from './F0';
import R0 from './R0';
import R1 from './R1';

const duration = 2000;

const paths = {
  uf0: 'uf0',
  f0u: 'uf0',
  uf1: 'uf1',
  f1u: 'uf1',
  uf2: 'uf2',
  f2u: 'uf2',
  uf3: 'uf3',
  f3u: 'uf3',

  ul: 'ul',
  lu: 'ul',

  f0l: 'f0l',
  lf0: 'f0l',
  f1l: 'f1l',
  lf1: 'f1l',
  f2l: 'f2l',
  lf2: 'f2l',
  f3l: 'f3l',
  lf3: 'f3l',

  lr0: 'lr0',
  lr1: 'lr1',
};

function getColorByLogData(data) {
  switch (data) {
    case 'tx':
      return '#FF5656';
    case 'oc':
      return '#24F6B7';
    case 'block':
      return '#189EFF';
    case 'lc':
      return '#E3CE12';
    default:
      return null;
  }
}

function getCircleColorByLogData(data) {
  switch (data) {
    case 'tx':
      return '#FF5656';
    case 'oc':
      return '#24F6B7';
    case 'block':
      return '#189EFF';
    case 'lc':
      return null;
    default:
      return null;
  }
}

function getFilterByLogData(data) {
  switch (data) {
    case 'tx':
      return {
        u: 'url(#filter0_d_106_4195)',

        f0: 'url(#filter1_d_106_4195)',
        f1: 'url(#filter2_d_106_4195)',
        f2: 'url(#filter3_d_106_4195)',
        f3: 'url(#filter4_d_106_4195)',

        l: 'url(#filter5_d_106_4195)',
      };
    case 'oc':
      return {
        u: 'url(#filter0_d_106_4932)',

        f0: 'url(#filter1_d_106_4932)',
        f1: 'url(#filter2_d_106_4932)',
        f2: 'url(#filter3_d_106_4932)',
        f3: 'url(#filter4_d_106_4932)',

        f4: 'url(#filter5_d_106_4195)',
      };
    case 'block':
      return { l: 'url(#filter0_d_138_1546)', r0: 'url(#filter1_d_138_1546)', r1: 'url(#filter2_d_138_1546)' };
    case 'lc':
      return {
        f0: 'url(#filter0_d_138_733)',
        f1: 'url(#filter1_d_138_733)',
        f2: 'url(#filter2_d_138_733)',
        f3: 'url(#filter3_d_138_733)',
        l: 'url(#filter4_d_138_733)',
      };
    default:
      return null;
  }
}

function getHighlightColor(log, node) {
  if (log.from === node || log.to === node) {
    return getColorByLogData(log.data) || 'transparent';
  }
  return 'transparent';
}

function getFilterColor(log, node) {
  if (log.from === node || log.to === node) {
    return getFilterByLogData(log.data)[node] || 'transparent';
  }
  return 'transparent';
}

function getPathColor(log, from, to) {
  if ((log.from === from && log.to === to) || (log.from === to && log.to === from)) {
    return getColorByLogData(log.data) || '#5C5B5E';
  }
  return '#5C5B5E';
}

function getMessage(log, from, to, data) {
  if (log.data === data && ((log.from === from && log.to === to) || (log.from === to && log.to === from))) return true;
  return false;
}

const Test = () => {
  const [logs, setLogs] = useState(dbData);
  const [currentIndex, setCurrentIndex] = useState(0);
  //   const [motionPath, setMotionPath] = useState('');
  const animateMotionRef = useRef(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleReversed = (log) => {
    if (log.to === 'l' && (log.from === 'f0' || log.from === 'f1' || log.from === 'f2' || log.from === 'f3')) {
      return true;
    }

    if (log.to === 'u' && (log.from === 'f0' || log.from === 'f1' || log.from === 'f2' || log.from === 'f3')) {
      return true;
    }
    return false;
  };

  // Restart the animation on every log
  useEffect(() => {
    const animateMotionElement = animateMotionRef.current;
    if (animateMotionElement) {
      animateMotionElement.beginElement();
    }
  }, [currentIndex]);

  // Iterate through the logs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logs.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  const currentLog = logs[currentIndex];

  const motionPath = paths[currentLog.from + currentLog.to];
  console.log(currentLog);

  return (
    <svg width='1100' height='406' viewBox='0 0 1100 406' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path id='ul' d='M175 204.001L641 204.001' stroke={getPathColor(currentLog, 'u', 'l')} />
      <path
        id='lr0'
        d='M735 204H876.151C889.958 204 901.151 192.807 901.151 179V144.849C901.151 137.753 906.904 132 914 132V132'
        stroke={getPathColor(currentLog, 'l', 'r0')}
      />
      <path
        id='lr1'
        d='M735 204H876.151C889.958 204 901.151 215.193 901.151 229V263.151C901.151 270.247 906.904 276 914 276V276'
        stroke={getPathColor(currentLog, 'l', 'r1')}
      />
      <path id='uf0' d='M137 158V85C137 71.1929 148.193 60 162 60H366' stroke={getPathColor(currentLog, 'u', 'f0')} />
      <path id='uf1' d='M137 158V158C137 145.85 146.85 136 159 136H366' stroke={getPathColor(currentLog, 'u', 'f1')} />
      <path id='uf2' d='M137 249V249C137 261.15 146.85 271 159 271H366' stroke={getPathColor(currentLog, 'u', 'f2')} />
      <path
        id='uf3'
        d='M137 249V322C137 335.807 148.193 347 162 347H366'
        stroke={getPathColor(currentLog, 'u', 'f3')}
      />
      <path id='f0l' d='M689 158V85C689 71.1929 677.807 60 664 60H460' stroke={getPathColor(currentLog, 'f0', 'l')} />
      <path id='f1l' d='M689 158V158C689 145.85 679.15 136 667 136H460' stroke={getPathColor(currentLog, 'f1', 'l')} />
      <path id='f2l' d='M689 249V249C689 261.15 679.15 271 667 271H460' stroke={getPathColor(currentLog, 'f2', 'l')} />
      <path
        id='f3l'
        d='M689 249V322C689 335.807 677.807 347 664 347H460'
        stroke={getPathColor(currentLog, 'f3', 'l')}
      />
      {handleReversed(currentLog) ? (
        <circle r='5' fill={getCircleColorByLogData(currentLog.data)}>
          <animateMotion dur={`${duration / 1000}s`} repeatCount='indefinite' keyPoints='1;0' keyTimes='0;1'>
            <mpath href={`#${motionPath}`} />
          </animateMotion>
        </circle>
      ) : (
        <circle r='5' fill={getCircleColorByLogData(currentLog.data)}>
          <animateMotion dur={`${duration / 1000}s`} repeatCount='indefinite'>
            <mpath href={`#${motionPath}`} />
          </animateMotion>
        </circle>
      )}
      <U filterColor={getFilterColor(currentLog, 'u')} highlightColor={getHighlightColor(currentLog, 'u')} />
      <F0 filterColor={getFilterColor(currentLog, 'f0')} highlightColor={getHighlightColor(currentLog, 'f0')} />
      <F1 filterColor={getFilterColor(currentLog, 'f1')} highlightColor={getHighlightColor(currentLog, 'f1')} />
      <F2 filterColor={getFilterColor(currentLog, 'f2')} highlightColor={getHighlightColor(currentLog, 'f2')} />
      <F3 filterColor={getFilterColor(currentLog, 'f3')} highlightColor={getHighlightColor(currentLog, 'f3')} />
      <L filterColor={getFilterColor(currentLog, 'l')} highlightColor={getHighlightColor(currentLog, 'l')} />
      <R0 filterColor={getFilterColor(currentLog, 'r0')} highlightColor={getHighlightColor(currentLog, 'r0')} />
      <R1 filterColor={getFilterColor(currentLog, 'r1')} highlightColor={getHighlightColor(currentLog, 'r1')} />

      {getMessage(currentLog, 'u', 'f0', 'tx') && (
        <g filter='url(#filter6_d_106_4195)'>
          <rect x='198' y='44' width='118' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='198.5' y='44.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='210' y='64.32'>
              ENCRYPTED TX
            </tspan>
          </text>
          <path
            d='M300.667 56.2227L304.444 60.0004L300.667 63.7782'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M296.444 56.2227L300.222 60.0004L296.444 63.7782'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'u', 'f0', 'oc') && (
        <g filter='url(#filter6_d_106_4932)'>
          <rect x='176' y='44' width='156' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='176.5' y='44.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
          <path
            d='M191.333 56.2227L187.556 60.0004L191.333 63.7782'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M195.556 56.2227L191.778 60.0004L195.556 63.7782'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='202' y='64.32'>
              ORDER COMMITMENT
            </tspan>
          </text>
        </g>
      )}
      {getMessage(currentLog, 'f0', 'l', 'tx') && (
        <g filter='url(#filter7_d_106_4195)'>
          <rect x='511' y='44' width='118' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='511.5' y='44.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='523' y='64.32'>
              ENCRYPTED TX
            </tspan>
          </text>
          <path
            d='M613.667 56.2227L617.444 60.0004L613.667 63.7782'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M609.444 56.2227L613.222 60.0004L609.444 63.7782'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'f0', 'l', 'oc') && (
        <g filter='url(#filter7_d_106_4932)'>
          <rect x='495' y='44' width='156' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='495.5' y='44.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
          <path
            d='M510.333 56.2227L506.556 60.0004L510.333 63.7782'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M514.556 56.2227L510.778 60.0004L514.556 63.7782'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='521' y='64.32'>
              ORDER COMMITMENT
            </tspan>
          </text>
        </g>
      )}
      {getMessage(currentLog, 'f1', 'l', 'tx') && (
        <g filter='url(#filter8_d_106_4195)'>
          <rect x='511' y='120' width='118' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='511.5' y='120.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='523' y='140.32'>
              ENCRYPTED TX
            </tspan>
          </text>
          <path
            d='M613.667 132.223L617.444 136L613.667 139.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M609.444 132.223L613.222 136L609.444 139.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'f1', 'l', 'oc') && (
        <g filter='url(#filter8_d_106_4932)'>
          <rect x='495' y='120' width='156' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='495.5' y='120.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
          <path
            d='M510.333 132.223L506.556 136L510.333 139.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M514.556 132.223L510.778 136L514.556 139.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='521' y='140.32'>
              ORDER COMMITMENT
            </tspan>
          </text>
        </g>
      )}
      {getMessage(currentLog, 'f2', 'l', 'tx') && (
        <g filter='url(#filter9_d_106_4195)'>
          <rect x='511' y='255' width='118' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='511.5' y='255.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='523' y='275.32'>
              ENCRYPTED TX
            </tspan>
          </text>
          <path
            d='M613.667 267.223L617.444 271L613.667 274.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M609.444 267.223L613.222 271L609.444 274.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'f2', 'l', 'oc') && (
        <g filter='url(#filter9_d_106_4932)'>
          <rect x='495' y='255' width='156' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='495.5' y='255.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
          <path
            d='M510.333 267.223L506.556 271L510.333 274.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M514.556 267.223L510.778 271L514.556 274.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='521' y='275.32'>
              ORDER COMMITMENT
            </tspan>
          </text>
        </g>
      )}
      {getMessage(currentLog, 'f3', 'l', 'tx') && (
        <g filter='url(#filter10_d_106_4195)'>
          <rect x='511' y='331' width='118' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='511.5' y='331.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='523' y='351.32'>
              ENCRYPTED TX
            </tspan>
          </text>
          <path
            d='M613.667 343.223L617.444 347L613.667 350.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M609.444 343.223L613.222 347L609.444 350.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'f3', 'l', 'oc') && (
        <g filter='url(#filter10_d_106_4932)'>
          <rect x='495' y='331' width='156' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='495.5' y='331.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
          <path
            d='M510.333 343.223L506.556 347L510.333 350.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M514.556 343.223L510.778 347L514.556 350.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='521' y='351.32'>
              ORDER COMMITMENT
            </tspan>
          </text>
        </g>
      )}
      {getMessage(currentLog, 'u', 'f1', 'tx') && (
        <g filter='url(#filter11_d_106_4195)'>
          <rect x='198' y='120' width='118' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='198.5' y='120.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='210' y='140.32'>
              ENCRYPTED TX
            </tspan>
          </text>
          <path
            d='M300.667 132.223L304.444 136L300.667 139.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M296.444 132.223L300.222 136L296.444 139.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'u', 'f1', 'oc') && (
        <g filter='url(#filter11_d_106_4932)'>
          <rect x='176' y='120' width='156' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='176.5' y='120.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
          <path
            d='M191.333 132.223L187.556 136L191.333 139.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M195.556 132.223L191.778 136L195.556 139.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='202' y='140.32'>
              ORDER COMMITMENT
            </tspan>
          </text>
        </g>
      )}
      {getMessage(currentLog, 'u', 'f3', 'tx') && (
        <g filter='url(#filter12_d_106_4195)'>
          <rect x='198' y='331' width='118' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='198.5' y='331.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='210' y='351.32'>
              ENCRYPTED TX
            </tspan>
          </text>
          <path
            d='M300.667 343.223L304.444 347L300.667 350.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M296.444 343.223L300.222 347L296.444 350.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'u', 'f3', 'oc') && (
        <g filter='url(#filter12_d_106_4932)'>
          <rect x='176' y='331' width='156' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='176.5' y='331.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
          <path
            d='M191.333 343.223L187.556 347L191.333 350.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M195.556 343.223L191.778 347L195.556 350.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='202' y='351.32'>
              ORDER COMMITMENT
            </tspan>
          </text>
        </g>
      )}
      {getMessage(currentLog, 'u', 'f2', 'tx') && (
        <g filter='url(#filter13_d_106_4195)'>
          <rect x='198' y='255' width='118' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='198.5' y='255.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='210' y='275.32'>
              ENCRYPTED TX
            </tspan>
          </text>
          <path
            d='M300.667 267.223L304.444 271L300.667 274.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M296.444 267.223L300.222 271L296.444 274.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'u', 'f2', 'oc') && (
        <g filter='url(#filter13_d_106_4932)'>
          <rect x='176' y='255' width='156' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='176.5' y='255.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
          <path
            d='M191.333 267.223L187.556 271L191.333 274.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M195.556 267.223L191.778 271L195.556 274.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='202' y='275.32'>
              ORDER COMMITMENT
            </tspan>
          </text>
        </g>
      )}
      {getMessage(currentLog, 'u', 'l', 'tx') && (
        <g filter='url(#filter14_d_106_4195)'>
          <rect x='355' y='187' width='118' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='355.5' y='187.5' width='117' height='31' rx='3.5' stroke='#FF5656' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='367' y='207.32'>
              ENCRYPTED TX
            </tspan>
          </text>
          <path
            d='M457.667 199.223L461.444 203L457.667 206.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M453.444 199.223L457.222 203L453.444 206.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'u', 'l', 'oc') && (
        <g filter='url(#filter14_d_106_4932)'>
          <rect x='336' y='187' width='156' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='336.5' y='187.5' width='155' height='31' rx='3.5' stroke='#24F6B7' shapeRendering='crispEdges' />
          <path
            d='M351.333 199.223L347.556 203L351.333 206.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M355.556 199.223L351.778 203L355.556 206.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='362' y='207.32'>
              ORDER COMMITMENT
            </tspan>
          </text>
        </g>
      )}
      {getMessage(currentLog, 'f0', 'l', 'lc') && (
        <g filter='url(#filter5_d_138_733)'>
          <rect x='515' y='44' width='108' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='515.5' y='44.5' width='107' height='31' rx='3.5' stroke='#E3CE12' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='527' y='64.32'>
              NEW LEADER
            </tspan>
          </text>
          <path
            d='M607.667 56.2227L611.444 60.0004L607.667 63.7782'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M603.444 56.2227L607.222 60.0004L603.444 63.7782'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'f1', 'l', 'lc') && (
        <g filter='url(#filter6_d_138_733)'>
          <rect x='515' y='120' width='108' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='515.5' y='120.5' width='107' height='31' rx='3.5' stroke='#E3CE12' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='527' y='140.32'>
              NEW LEADER
            </tspan>
          </text>
          <path
            d='M607.667 132.223L611.444 136L607.667 139.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M603.444 132.223L607.222 136L603.444 139.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'f2', 'l', 'lc') && (
        <g filter='url(#filter7_d_138_733)'>
          <rect x='515' y='255' width='108' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='515.5' y='255.5' width='107' height='31' rx='3.5' stroke='#E3CE12' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='527' y='275.32'>
              NEW LEADER
            </tspan>
          </text>
          <path
            d='M607.667 267.223L611.444 271L607.667 274.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M603.444 267.223L607.222 271L603.444 274.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {getMessage(currentLog, 'f3', 'l', 'lc') && (
        <g filter='url(#filter8_d_138_733)'>
          <rect x='515' y='331' width='108' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='515.5' y='331.5' width='107' height='31' rx='3.5' stroke='#E3CE12' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='527' y='351.32'>
              NEW LEADER
            </tspan>
          </text>
          <path
            d='M607.667 343.223L611.444 347L607.667 350.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M603.444 343.223L607.222 347L603.444 350.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      {(getMessage(currentLog, 'l', 'r0', 'block') || getMessage(currentLog, 'l', 'r1', 'block')) && (
        <g filter='url(#filter3_d_138_1546)'>
          <rect x='779' y='188' width='75' height='32' rx='4' fill='white' shapeRendering='crispEdges' />
          <rect x='779.5' y='188.5' width='74' height='31' rx='3.5' stroke='#189EFF' shapeRendering='crispEdges' />
          <text
            fill='#090A0F'
            xmlSpace='preserve'
            style={{ whiteSpace: 'pre' }}
            fontFamily='area-normal'
            fontSize='10'
            fontWeight='700'
            letterSpacing='0em'
          >
            <tspan x='791' y='208.32'>
              BLOCK
            </tspan>
          </text>
          <path
            d='M838.667 200.223L842.444 204L838.667 207.778'
            stroke='#090A0F'
            strokeOpacity='0.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M834.444 200.223L838.222 204L834.444 207.778'
            stroke='#090A0F'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      )}
      <Defs />
    </svg>
  );
};

export default Test;
