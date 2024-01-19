import React from 'react';

const L = ({ filterColor, highlightColor, id }) => {
  return (
    <g filter={filterColor}>
      <rect x='641' y='158' width='94.4344' height='91' rx='12' fill='#090A0F' shapeRendering='crispEdges' />
      <rect
        x='640.5'
        y='157.5'
        width='95.4344'
        height='92'
        rx='12.5'
        stroke={highlightColor}
        strokeWidth='1'
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
          {id}
        </tspan>
      </text>
    </g>
  );
};

export default L;
