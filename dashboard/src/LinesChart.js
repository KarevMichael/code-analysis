import React, {useState} from 'react';
import {
  Crosshair,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis
} from "react-vis";

export const LinesChart = ({lines}) => {
  const data = lines.map((line, index) => ({
    x: index,
    y: line.complexity,
    symbols: line.symbols
  }))

  return (
    <XYPlot height={300} width={500}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <VerticalBarSeries data={data} style={{stroke: '#fff'}} onNearestX={(value, {index}) => {
      }}/>
      <XAxis title="Line"/>
      <YAxis title="Complexity"/>
    </XYPlot>
  )
}
