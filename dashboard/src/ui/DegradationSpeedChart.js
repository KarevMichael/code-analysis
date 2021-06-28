import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  Crosshair,
  XAxis,
  YAxis
} from 'react-vis';
import 'react-vis/dist/style.css';
import styled from 'styled-components';
import React, { useState } from 'react';
import { AutoSizer } from 'react-virtualized';

const Legend = styled.div`
  padding: 4px;
  background-color: black;
  border-radius: 3px;
  border: 1px solid white;
  color: white;
  z-index: 10000;
`;

export const DegradationSpeedChart = ({ data }) => {
  const series = data.map((s, index) => ({
    x: index,
    y: s.degradationSpeed,
    name: s.name
  }));
  const [hoverValue, setHoverValue] = useState([]);

  return (
    <AutoSizer>
      {({ width }) => (
        <XYPlot
          height={500}
          width={width}
          onMouseLeave={() => {
            setHoverValue([]);
          }}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <VerticalBarSeries
            data={series}
            style={{ stroke: '#fff' }}
            onNearestX={(value) => {
              setHoverValue([value]);
            }}
          />
          <Crosshair values={hoverValue}>
            <Legend>
              <p>Degradation Speed: {hoverValue[0]?.y}</p>
              <p>Name: {hoverValue[0]?.name}</p>
            </Legend>
          </Crosshair>
          <XAxis title="Files" />
          <YAxis title="Degradation speed" />
        </XYPlot>
      )}
    </AutoSizer>
  );
};
