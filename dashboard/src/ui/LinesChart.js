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

export const LinesChart = ({ lines, width, onInfo }) => {
  const data = lines.map((line, index) => ({
    x: index,
    y: line.complexity,
    ...line,
    type: 'line'
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
          console.log(data);
        }}
      />
      <Crosshair values={hoverValue}>
        <Legend>
          <h3>Line stats:</h3>
          <p>Line: {hoverValue[0]?.x}</p>
          <p>Complexity: {hoverValue[0]?.y}</p>
        </Legend>
      </Crosshair>
      <XAxis title="lines" />
      <YAxis title="complexity" />
    </XYPlot>
  );
};
