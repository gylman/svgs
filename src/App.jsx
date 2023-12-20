import { styled } from 'styled-components';
import './index.css';
// import { Timeout } from './components/Timeout';
import { useEffect, useState } from 'react';
import SVG from './components/SVG';
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Canvas = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 50%;
  background: white;
  border-radius: 10px;
  padding: 10px;
`;

const User = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: orange;
`;

const Seqs = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: red;
  width: 100%;
`;

const SeqWrapper = styled.div`
  position: absolute;
  background: blue;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`;

const Rollup = styled.div`
  height: 100%;
  width: 30px;
  background-color: darkblue;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const Button = styled.div`
  padding: 20px 10px;
  background: red;
  border-radius: 10px;
  min-width: 100px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

function App() {
  const [heartbeat, setHeartbeat1] = useState(false);

  const handleClick = () => {
    setHeartbeat1(true);
  };
  const [txSentTo, setTxSentTo] = useState('');
  const sendTxToSeq1 = () => {
    setTxSentTo('s1');
  };
  const sendTxToSeq2 = () => {
    setTxSentTo('s2');
  };
  const sendTxToLeader = () => {
    setTxSentTo('leader');
  };
  const sendTxToSeq3 = () => {
    setTxSentTo('s3');
  };
  const sendTxToSeq4 = () => {
    setTxSentTo('s4');
  };

  return <SVG txSentTo={txSentTo} />;
}

export default App;
