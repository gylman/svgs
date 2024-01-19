import React, { useEffect, useRef, useState } from 'react';
import { dbData } from '../assets/data';
import Defs from './Defs';
import U from './U';
import F1 from './F1';
import F2 from './F2';
import F3 from './F3';
import L from './L';
import F0 from './F0';
import F0L from './F0L';
import F1L from './F1L';
import F2L from './F2L';
import F3L from './F3L';
import R0 from './R0';
import R1 from './R1';
import Message from './Message';
import UF0 from './UF0';
import UF1 from './UF1';
import UF2 from './UF2';
import UF3 from './UF3';
import UL from './UL';
import LR0 from './LR0';
import LR1 from './LR1';
import Circle from './Circle';

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

const colors = {
  tx: '#FF5656',
  oc: '#24F6B7',
  block: '#189EFF',
  lc: '#E3CE12',
};

const filters = {
  tx: {
    u: 'url(#filter0_d_106_4195)',

    f0: 'url(#filter1_d_106_4195)',
    f1: 'url(#filter2_d_106_4195)',
    f2: 'url(#filter3_d_106_4195)',
    f3: 'url(#filter4_d_106_4195)',

    l: 'url(#filter5_d_106_4195)',
  },
  oc: {
    u: 'url(#filter0_d_106_4932)',

    f0: 'url(#filter1_d_106_4932)',
    f1: 'url(#filter2_d_106_4932)',
    f2: 'url(#filter3_d_106_4932)',
    f3: 'url(#filter4_d_106_4932)',

    f4: 'url(#filter5_d_106_4195)',
  },
  block: { l: 'url(#filter0_d_138_1546)', r0: 'url(#filter1_d_138_1546)', r1: 'url(#filter2_d_138_1546)' },
  lc: {
    f0: 'url(#filter0_d_138_733)',
    f1: 'url(#filter1_d_138_733)',
    f2: 'url(#filter2_d_138_733)',
    f3: 'url(#filter3_d_138_733)',
    l: 'url(#filter4_d_138_733)',
  },
};

const getColor = (data) => colors[data] || '#5C5B5E';
const getFilter = (data, node) => filters[data]?.[node] || 'none';

function getPathColor(log, from, to) {
  if ((log.from === from && log.to === to) || (log.from === to && log.to === from)) {
    return getColor(log.data);
  }
  return '#5C5B5E';
}

function getHighlightColor(log, node) {
  return log.from === node || log.to === node ? getColor(log.data) : 'transparent';
}

function getFilterColor(log, node) {
  return log.from === node || log.to === node ? getFilter(log.data, node) : 'none';
}
const Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animateMotionRef = useRef(null);

  useEffect(() => {
    animateMotionRef.current?.beginElement();
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dbData.length);
    }, duration);
    return () => clearInterval(interval);
  }, []);

  const currentLog = dbData[currentIndex];
  const motionPath = paths[currentLog.from + currentLog.to];
  const isReversed = ['l', 'u'].includes(currentLog.to) && ['f0', 'f1', 'f2', 'f3'].includes(currentLog.from);

  return (
    <svg width='1100' height='406' viewBox='0 0 1100 406' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {/* The following are the paths from one node to another, i.e. UF0 is the path from 'user' to 'follower 0' */}
      <UF0 stroke={getPathColor(currentLog, 'u', 'f0')} />
      <UF1 stroke={getPathColor(currentLog, 'u', 'f1')} />
      <UF2 stroke={getPathColor(currentLog, 'u', 'f2')} />
      <UF3 stroke={getPathColor(currentLog, 'u', 'f3')} />
      <UL stroke={getPathColor(currentLog, 'u', 'l')} />
      <F0L stroke={getPathColor(currentLog, 'f0', 'l')} />
      <F1L stroke={getPathColor(currentLog, 'f1', 'l')} />
      <F2L stroke={getPathColor(currentLog, 'f2', 'l')} />
      <F3L stroke={getPathColor(currentLog, 'f3', 'l')} />
      <LR0 stroke={getPathColor(currentLog, 'l', 'r0')} />
      <LR1 stroke={getPathColor(currentLog, 'l', 'r1')} />
      {/* Circle is the dot moving along the path */}
      <Circle color={getColor(currentLog.data)} motionPath={motionPath} duration={duration} isReversed={isReversed} />
      {/* Entities themselves */}
      <U filterColor={getFilterColor(currentLog, 'u')} highlightColor={getHighlightColor(currentLog, 'u')} />
      <F0 filterColor={getFilterColor(currentLog, 'f0')} highlightColor={getHighlightColor(currentLog, 'f0')} />
      <F1 filterColor={getFilterColor(currentLog, 'f1')} highlightColor={getHighlightColor(currentLog, 'f1')} />
      <F2 filterColor={getFilterColor(currentLog, 'f2')} highlightColor={getHighlightColor(currentLog, 'f2')} />
      <F3 filterColor={getFilterColor(currentLog, 'f3')} highlightColor={getHighlightColor(currentLog, 'f3')} />
      <L filterColor={getFilterColor(currentLog, 'l')} highlightColor={getHighlightColor(currentLog, 'l')} />
      <R0 filterColor={getFilterColor(currentLog, 'r0')} highlightColor={getHighlightColor(currentLog, 'r0')} />
      <R1 filterColor={getFilterColor(currentLog, 'r1')} highlightColor={getHighlightColor(currentLog, 'r1')} />
      {/* Message is the text box appearing on the path */}
      <Message currentLog={currentLog} />
      <Defs />
    </svg>
  );
};

export default Test;
