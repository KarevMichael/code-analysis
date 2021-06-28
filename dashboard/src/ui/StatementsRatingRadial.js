import { RadialChart, Hint } from 'react-vis';
import 'react-vis/dist/style.css';
import sumBy from 'lodash/sumBy';
import styled from 'styled-components';
import { useState } from 'react';
import { AutoSizer } from 'react-virtualized';

const Legend = styled.div`
  padding: 4px;
  background-color: black;
  border-radius: 3px;
  border: 1px solid white;
  color: white;
  z-index: 10000;
`;

export const StatementsRatingRadial = ({ data }) => {
  const fullComplexity = sumBy(data, 'complexity');
  const angles = data.map((s) => ({
    angle: s.complexity / fullComplexity,
    kind: s.kind,
    complexity: s.complexity
  }));
  const [hoverValue, setHoverValue] = useState(null);

  return (
    <AutoSizer>
      {({ width }) => (
        <RadialChart
          data={angles}
          width={width}
          height={500}
          onValueMouseOver={(value) => setHoverValue(value)}
          onValueMouseOut={() => setHoverValue(null)}
        >
          {hoverValue && (
            <Hint value={hoverValue}>
              <Legend>
                <p>Kind: {hoverValue.kind}</p>
                <p>Complexity: {hoverValue.complexity}</p>
              </Legend>
            </Hint>
          )}
        </RadialChart>
      )}
    </AutoSizer>
  );
};
