import React, { useState } from 'react';
import {
  Crosshair,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis';
import 'react-vis/dist/style.css';
import styled from 'styled-components';

const Legend = styled.div`
  padding: 4px;
  background-color: black;
  border-radius: 3px;
  border: 1px solid white;
  color: white;
  width: 90px;
`;

export const StatementsChart = ({ statements, width, onInfo }) => {
  const data = statements.map((statement, index) => ({
    x: index,
    y: statement.complexity,
    ...statement,
    type: 'word'
  }));

  const [hoverValue, setHoverValue] = useState([]);

  return (
    <XYPlot
      height={300}
      width={width}
      onMouseLeave={() => {
        setHoverValue([]);
      }}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <VerticalBarSeries
        data={data}
        style={{ stroke: '#fff' }}
        onNearestX={(value, { index }) => {
          setHoverValue([value]);
        }}
        onValueClick={data => {
          onInfo(data);
        }}
      />
      <Crosshair values={hoverValue}>
        <Legend>
          <h3>Statement stats:</h3>
          <p>Position in file: {hoverValue[0]?.x}</p>
          <p>Complexity: {hoverValue[0]?.y}</p>
          <p>Kind: {hoverValue[0]?.kind}</p>
        </Legend>
      </Crosshair>
      <XAxis title="statements" />
      <YAxis title="complexity" />
    </XYPlot>
  );
};
