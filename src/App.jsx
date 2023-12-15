import { styled } from 'styled-components';
import './index.css';
import { Patience } from './components/Patience';
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
  justify-content: center;
  width: 50%;
  height: 50%;
  background: white;
  border-radius: 10px;
`;

function App() {
  return (
    <Container>
      <Canvas>
        <Patience timeout={100} />
        <Patience timeout={90} />
        <Patience timeout={80} />
        <Patience timeout={85} />
        <Patience timeout={75} />
      </Canvas>
    </Container>
  );
}

export default App;
