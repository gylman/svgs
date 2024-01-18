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
import Message from './Message';

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
  // console.log(currentLog);

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
          <animateMotion dur={`${duration}ms`} repeatCount='indefinite' keyPoints='1;0' keyTimes='0;1'>
            <mpath href={`#${motionPath}`} />
          </animateMotion>
        </circle>
      ) : (
        <circle r='5' fill={getCircleColorByLogData(currentLog.data)}>
          <animateMotion dur={`${duration}ms`} repeatCount='indefinite'>
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
      <Message currentLog={currentLog} />
      <Defs />
    </svg>
  );
};

export default Test;
