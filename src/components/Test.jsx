import React, { useEffect, useRef, useState } from 'react';
import { dbData } from '../assets/data';
import Defs from './Defs';

const duration = 1000;

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

function getColorByLogData(logData) {
  switch (logData) {
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

function getHighlightColor(currentLog, node) {
  if (currentLog.from === node || currentLog.to === node) {
    return getColorByLogData(currentLog.data) || 'transparent';
  }
  return 'transparent';
}

function getPathColor(currentLog, from, to) {
  if ((currentLog.from === from && currentLog.to === to) || (currentLog.from === to && currentLog.to === from)) {
    return getColorByLogData(currentLog.data) || '#5C5B5E';
  }
  return '#5C5B5E';
}

function getMessage(currentLog, from, to, data) {
  if (
    currentLog.data === data &&
    ((currentLog.from === from && currentLog.to === to) || (currentLog.from === to && currentLog.to === from))
  )
    return true;
  return false;
}

const Test = () => {
  const [highlight, setHighlight] = useState('#5C5B5E');

  const [logs, setLogs] = useState(dbData);
  const [currentIndex, setCurrentIndex] = useState(0);
  //   const [motionPath, setMotionPath] = useState('');
  const animateMotionRef = useRef(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleReversed = (log) => {
    if (
      currentLog.to === 'l' &&
      (currentLog.from === 'f0' || currentLog.from === 'f1' || currentLog.from === 'f2' || currentLog.from === 'f3')
    ) {
      return true;
    }

    if (
      currentLog.to === 'u' &&
      (currentLog.from === 'f0' || currentLog.from === 'f1' || currentLog.from === 'f2' || currentLog.from === 'f3')
    ) {
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
        <circle
          r='5'
          fill={
            (currentLog.data === 'tx' && '#ff7070') ||
            (currentLog.data === 'oc' && '#1BC199') ||
            (currentLog.data === 'block' && '#189EFF') ||
            (currentLog.data === 'lc' && 'transparent')
          }
        >
          <animateMotion dur={`${duration / 1000}s`} repeatCount='indefinite' keyPoints='1;0' keyTimes='0;1'>
            <mpath href={`#${motionPath}`} />
          </animateMotion>
        </circle>
      ) : (
        <circle
          r='5'
          fill={
            (currentLog.data === 'tx' && '#ff7070') ||
            (currentLog.data === 'oc' && '#1BC199') ||
            (currentLog.data === 'block' && '#189EFF') ||
            (currentLog.data === 'lc' && 'transparent')
          }
        >
          <animateMotion dur={`${duration / 1000}s`} repeatCount='indefinite'>
            <mpath href={`#${motionPath}`} />
          </animateMotion>
        </circle>
      )}
      <g filter='url(#filter0_d_106_4195)'>
        <rect x='99' y='158' width='76' height='91' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
        <rect
          x='98.5'
          y='157.5'
          width='77'
          height='92'
          rx='12.5'
          stroke={getHighlightColor(currentLog, 'u')}
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
        <rect x='103' y='162' width='68' height='83' rx='8' fill='#090A0F' />
        <rect x='103.5' y='162.5' width='67' height='82' rx='7.5' stroke='white' strokeOpacity='0.4' />
        <rect x='119.5' y='174.5' width='35' height='35' rx='17.5' stroke='white' strokeOpacity='0.4' />
        <path
          d='M133.863 189.647C135.422 189.647 136.686 188.382 136.686 186.823C136.686 185.264 135.422 183.999 133.863 183.999C132.303 183.999 131.039 185.264 131.039 186.823C131.039 188.382 132.303 189.647 133.863 189.647Z'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M138.933 199.143C139.983 198.778 140.521 197.566 140.02 196.573C138.883 194.325 136.555 192.783 133.863 192.783C131.171 192.783 128.843 194.324 127.706 196.573C127.204 197.566 127.741 198.778 128.793 199.143C130.087 199.592 131.815 200 133.863 200C135.911 200 137.639 199.592 138.933 199.143Z'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M142.706 199.784C143.658 199.624 144.498 199.389 145.207 199.143C146.258 198.778 146.796 197.565 146.294 196.573C145.315 194.638 143.454 193.226 141.237 192.871'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M139.175 189.471C139.476 189.58 139.799 189.647 140.137 189.647C141.697 189.647 142.961 188.383 142.961 186.823C142.961 185.263 141.697 183.999 140.137 183.999C139.799 183.999 139.476 184.065 139.175 184.175'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <text
          fill='white'
          xmlSpace='preserve'
          style={{ whiteSpace: 'pre' }}
          fontFamily='area-normal'
          fontSize='14'
          letterSpacing='0em'
        >
          <tspan x='124' y='229.548'>
            0xa
          </tspan>
        </text>
      </g>
      <g filter='url(#filter1_d_106_4195)'>
        <rect x='366' y='23' width='94.4344' height='73' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
        <rect
          x='365.5'
          y='22.5'
          width='95.4344'
          height='74'
          rx='12.5'
          stroke={getHighlightColor(currentLog, 'f0')}
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
        <rect x='370.5' y='27.5' width='85.4344' height='64' rx='7.5' stroke='white' strokeOpacity='0.4' />
        <path
          d='M434.803 64.566H391.631C388.521 64.566 386 66.639 386 69.1962V75.3698C386 77.927 388.521 80 391.631 80H434.803C437.913 80 440.434 77.927 440.434 75.3698V69.1962C440.434 66.639 437.913 64.566 434.803 64.566Z'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M386.208 68L394.519 43.9658C395.545 41.0001 398.426 39 401.677 39H424.74C427.987 39 430.871 41.0001 431.897 43.9658L440.208 68'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M395.385 72.2821H405.709'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <text
          fill='white'
          xmlSpace='preserve'
          style={{ whiteSpace: 'pre' }}
          fontFamily='area-normal'
          fontSize='14'
          letterSpacing='0em'
        >
          <tspan x='400.217' y='56.548'>
            0x2
          </tspan>
        </text>
      </g>
      <g filter='url(#filter2_d_106_4195)'>
        <rect x='366' y='99' width='94.4344' height='73' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
        <rect
          x='365.5'
          y='98.5'
          width='95.4344'
          height='74'
          rx='12.5'
          stroke={getHighlightColor(currentLog, 'f1')}
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
        <rect x='370.5' y='103.5' width='85.4344' height='64' rx='7.5' stroke='white' strokeOpacity='0.4' />
        <path
          d='M434.803 140.566H391.631C388.521 140.566 386 142.639 386 145.196V151.37C386 153.927 388.521 156 391.631 156H434.803C437.913 156 440.434 153.927 440.434 151.37V145.196C440.434 142.639 437.913 140.566 434.803 140.566Z'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M386.208 144L394.519 119.966C395.545 117 398.426 115 401.677 115H424.74C427.987 115 430.871 117 431.897 119.966L440.208 144'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M395.385 148.282H405.709'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <text
          fill='white'
          xmlSpace='preserve'
          style={{ whiteSpace: 'pre' }}
          fontFamily='area-normal'
          fontSize='14'
          letterSpacing='0em'
        >
          <tspan x='400.217' y='132.548'>
            0x2
          </tspan>
        </text>
      </g>
      <g filter='url(#filter3_d_106_4195)'>
        <rect x='366' y='234' width='94.4344' height='73' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
        <rect
          x='365.5'
          y='233.5'
          width='95.4344'
          height='74'
          rx='12.5'
          stroke={getHighlightColor(currentLog, 'f2')}
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
        <rect x='370.5' y='238.5' width='85.4344' height='64' rx='7.5' stroke='white' strokeOpacity='0.4' />
        <path
          d='M434.803 275.566H391.631C388.521 275.566 386 277.639 386 280.196V286.37C386 288.927 388.521 291 391.631 291H434.803C437.913 291 440.434 288.927 440.434 286.37V280.196C440.434 277.639 437.913 275.566 434.803 275.566Z'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M386.208 279L394.519 254.966C395.545 252 398.426 250 401.677 250H424.74C427.987 250 430.871 252 431.897 254.966L440.208 279'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M395.385 283.282H405.709'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <text
          fill='white'
          xmlSpace='preserve'
          style={{ whiteSpace: 'pre' }}
          fontFamily='area-normal'
          fontSize='14'
          letterSpacing='0em'
        >
          <tspan x='400.217' y='267.548'>
            0x2
          </tspan>
        </text>
      </g>
      <g filter='url(#filter4_d_106_4195)'>
        <rect x='366' y='310' width='94.4344' height='73' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
        <rect
          x='365.5'
          y='309.5'
          width='95.4344'
          height='74'
          rx='12.5'
          stroke={getHighlightColor(currentLog, 'f3')}
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
        <rect x='370.5' y='314.5' width='85.4344' height='64' rx='7.5' stroke='white' strokeOpacity='0.4' />
        <path
          d='M434.803 351.566H391.631C388.521 351.566 386 353.639 386 356.196V362.37C386 364.927 388.521 367 391.631 367H434.803C437.913 367 440.434 364.927 440.434 362.37V356.196C440.434 353.639 437.913 351.566 434.803 351.566Z'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M386.208 355L394.519 330.966C395.545 328 398.426 326 401.677 326H424.74C427.987 326 430.871 328 431.897 330.966L440.208 355'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M395.385 359.282H405.709'
          stroke='#77FFFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <text
          fill='white'
          xmlSpace='preserve'
          style={{ whiteSpace: 'pre' }}
          fontFamily='area-normal'
          fontSize='14'
          letterSpacing='0em'
        >
          <tspan x='400.217' y='343.548'>
            0x2
          </tspan>
        </text>
      </g>
      <g filter='url(#filter5_d_106_4195)'>
        <rect x='641' y='158' width='94.4344' height='91' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
        <rect
          x='640.5'
          y='157.5'
          width='95.4344'
          height='92'
          rx='12.5'
          stroke={getHighlightColor(currentLog, 'l')}
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
        <rect x='645.5' y='162.5' width='85.4344' height='82' rx='7.5' stroke='white' strokeOpacity='0.4' />
        <path
          d='M680.25 220.935H679.75C679.336 220.935 679 221.271 679 221.685V222.185C679 222.599 679.336 222.935 679.75 222.935H680.25C680.664 222.935 681 222.599 681 222.185V221.685C681 221.271 680.664 220.935 680.25 220.935Z'
          fill='#FFD875'
        />
        <path
          d='M671.25 220.935H670.75C670.336 220.935 670 221.271 670 221.685V222.185C670 222.599 670.336 222.935 670.75 222.935H671.25C671.664 222.935 672 222.599 672 222.185V221.685C672 221.271 671.664 220.935 671.25 220.935Z'
          fill='#FFD875'
        />
        <path
          d='M689.25 220.935H688.75C688.336 220.935 688 221.271 688 221.685V222.185C688 222.599 688.336 222.935 688.75 222.935H689.25C689.664 222.935 690 222.599 690 222.185V221.685C690 221.271 689.664 220.935 689.25 220.935Z'
          fill='#FFD875'
        />
        <path
          d='M698.25 220.935H697.75C697.336 220.935 697 221.271 697 221.685V222.185C697 222.599 697.336 222.935 697.75 222.935H698.25C698.664 222.935 699 222.599 699 222.185V221.685C699 221.271 698.664 220.935 698.25 220.935Z'
          fill='#FFD875'
        />
        <path
          d='M684.25 217.435H683.75C683.336 217.435 683 217.771 683 218.185V218.685C683 219.099 683.336 219.435 683.75 219.435H684.25C684.664 219.435 685 219.099 685 218.685V218.185C685 217.771 684.664 217.435 684.25 217.435Z'
          fill='#FFD875'
        />
        <path
          d='M675.25 217.435H674.75C674.336 217.435 674 217.771 674 218.185V218.685C674 219.099 674.336 219.435 674.75 219.435H675.25C675.664 219.435 676 219.099 676 218.685V218.185C676 217.771 675.664 217.435 675.25 217.435Z'
          fill='#FFD875'
        />
        <path
          d='M693.25 217.435H692.75C692.336 217.435 692 217.771 692 218.185V218.685C692 219.099 692.336 219.435 692.75 219.435H693.25C693.664 219.435 694 219.099 694 218.685V218.185C694 217.771 693.664 217.435 693.25 217.435Z'
          fill='#FFD875'
        />
        <path
          d='M702.25 217.435H701.75C701.336 217.435 701 217.771 701 218.185V218.685C701 219.099 701.336 219.435 701.75 219.435H702.25C702.664 219.435 703 219.099 703 218.685V218.185C703 217.771 702.664 217.435 702.25 217.435Z'
          fill='#FFD875'
        />
        <path
          d='M707.25 220.935H706.75C706.336 220.935 706 221.271 706 221.685V222.185C706 222.599 706.336 222.935 706.75 222.935H707.25C707.664 222.935 708 222.599 708 222.185V221.685C708 221.271 707.664 220.935 707.25 220.935Z'
          fill='#FFD875'
        />
        <path
          d='M709.803 203.001H666.631C663.521 203.001 661 205.074 661 207.631V224.935C661 227.492 663.521 229.565 666.631 229.565H709.803C712.913 229.565 715.434 227.492 715.434 224.935V207.631C715.434 205.074 712.913 203.001 709.803 203.001Z'
          stroke='#FBFF42'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M661.208 206.435L669.519 182.401C670.545 179.435 673.426 177.435 676.677 177.435H699.74C702.987 177.435 705.871 179.435 706.897 182.401L715.208 206.435'
          stroke='#FBFF42'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M670.385 210.717H680.709'
          stroke='#FBFF42'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <text
          fill='white'
          xmlSpace='preserve'
          style={{ whiteSpace: 'pre' }}
          fontFamily='area-normal'
          fontSize='14'
          letterSpacing='0em'
        >
          <tspan x='675.217' y='194.548'>
            0x5
          </tspan>
        </text>
      </g>
      <rect x='913' y='98' width='100' height='68' rx='12' fill='#090A0F' />
      <rect
        x='913.5'
        y='98.5'
        width='99'
        height='67'
        rx='11.5'
        stroke={getHighlightColor(currentLog, 'r0')}
        strokeWidth='2'
        shapeRendering='crispEdges'
      />
      <rect x='917.5' y='102.5' width='91' height='59' rx='7.5' stroke='white' strokeOpacity='0.4' />
      <text
        fill='white'
        fillOpacity='0.6'
        xmlSpace='preserve'
        style={{ whiteSpace: 'pre' }}
        fontFamily='area-normal'
        fontSize='10'
        letterSpacing='0em'
      >
        <tspan x='947' y='124.82'>
          Rollup
        </tspan>
      </text>
      <text
        fill='white'
        xmlSpace='preserve'
        style={{ whiteSpace: 'pre' }}
        fontFamily='area-normal'
        fontSize='14'
        letterSpacing='0em'
      >
        <tspan x='957.5' y='146.548'>
          A
        </tspan>
      </text>
      <rect x='913' y='242' width='100' height='68' rx='12' fill='#090A0F' />
      <rect
        x='913.5'
        y='242.5'
        width='99'
        height='67'
        rx='11.5'
        stroke={getHighlightColor(currentLog, 'r1')}
        shapeRendering='crispEdges'
        strokeWidth='2'
      />
      <rect x='917.5' y='246.5' width='91' height='59' rx='7.5' stroke='white' strokeOpacity='0.4' />
      <text
        fill='white'
        fillOpacity='0.6'
        xmlSpace='preserve'
        style={{ whiteSpace: 'pre' }}
        fontFamily='area-normal'
        fontSize='10'
        letterSpacing='0em'
      >
        <tspan x='947' y='268.82'>
          Rollup
        </tspan>
      </text>
      <text
        fill='white'
        xmlSpace='preserve'
        style={{ whiteSpace: 'pre' }}
        fontFamily='area-normal'
        fontSize='14'
        letterSpacing='0em'
      >
        <tspan x='958' y='290.548'>
          B
        </tspan>
      </text>
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
