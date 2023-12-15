import { styled } from 'styled-components';
import './index.css';
// import { Timeout } from './components/Timeout';
import { useEffect, useState } from 'react';
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

function App() {
  const [heartbeat, setHeartbeat1] = useState(false);

  const handleClick = () => {
    setHeartbeat1(true);
  };

  return <Container></Container>;
}

export default App;
