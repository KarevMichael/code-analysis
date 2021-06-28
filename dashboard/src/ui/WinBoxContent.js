import { StatementsChart } from './StatementsChart';
import { LinesChart } from './LinesChart';
import styled from 'styled-components';
import {useState} from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Charts = styled(Container)`
  flex-direction: row;
`;

const Info = styled(Container)`
  border-top: 1px solid black;
  padding: 0 24px 24px 24px;
  width: 92% !important;
`;

const Textarea = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid black;
`

const Label = styled.h4``

export const WinBoxContent = ({ statements, lines, chartWidth }) => {
  const [currentInfo, setCurrentInfo] = useState({})
  return (
    <Container css="max-height: 50%">
      <Charts>
        <StatementsChart statements={statements} width={chartWidth / 2} onInfo={setCurrentInfo}/>
        <LinesChart lines={lines} width={chartWidth / 2} onInfo={(data) => setCurrentInfo(data)}/>
      </Charts>
      <Info>
        {currentInfo.type ? (
          <>
            <Label style={{marginBottom: 0}}>Current complexity = {currentInfo.complexity}</Label>
            <Label>Content</Label>
            <Textarea>{currentInfo.content.split('\n').map(line => <p style={{marginLeft: '24px', maxWidth: '100%'}}>{line}</p>)}</Textarea>
          </>
        ) : (<Label>Click any graph value to see detailed information about word/line</Label>)}
      </Info>
    </Container>
  );
};
