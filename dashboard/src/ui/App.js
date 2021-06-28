import React from 'react';
import styled from 'styled-components';
import useFetch from 'fetch-suspense';
import { treeBuilder } from '../utils/treeBuilder';
import Tree from './Tree';
import { buildWordsRating } from '../utils/buildWordsRating';
import { StatementsRatingRadial } from './StatementsRatingRadial';
import { buildFileRating } from '../utils/buildFileRating';
import { FilesRatingChart } from './FilesRatingChart';
import { DegradationSpeedChart } from './DegradationSpeedChart';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

const AppContainer = styled.div`
  display: flex;
  padding: 16px 32px;
  background: rgba(173, 216, 230, 0.3);
`;

const TreeWindow = styled.div`
  max-height: 600px;
  height: 600px;
  overflow-y: auto;
  padding-top: 8px;
`;

const TreeContainer = styled.div`
  border: 1px solid #c0c0c0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  width: 33%;
  background: white;
  border-radius: 4px;
`;

const AreaHeading = styled.h1`
  margin-left: 16px;
  margin-bottom: 8px;
`;

const AreaDescription = styled.p`
  color: #757575;
  padding-left: 16px;
  margin-top: 0;
  border-bottom: 1px solid #c0c0c0;
  padding-bottom: 8px;
`;

const ProjectStatsContainer = styled(TreeContainer)`
  width: 66%;
  margin-left: 32px;
`;

const ReportContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const TabsLayout = styled.div`
  width: 100%;

  [data-reach-tab][aria-selected='true'] {
    text-decoration: underline;
  }
`;

const ReportTitle = styled.button`
  color: black;
  margin: 0;
  margin-bottom: 8px;
  background: none;
  border: none;
  cursor: pointer;
`;

const TabsListLayout = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const App = () => {
  const reportJSON = useFetch('/report');
  if (!reportJSON) {
    return null;
  }

  const filesRatings = buildFileRating(JSON.parse(reportJSON));

  return (
    <AppContainer>
      <TreeContainer>
        <AreaHeading>Built file tree</AreaHeading>
        <AreaDescription>
          See collected statistics for each individual file
        </AreaDescription>
        <TreeWindow>
          <Tree data={treeBuilder(JSON.parse(reportJSON))} />
        </TreeWindow>
      </TreeContainer>
      <ProjectStatsContainer>
        <AreaHeading>Project report</AreaHeading>
        <AreaDescription>
          See results of your project estimating
        </AreaDescription>
        <ReportContainer>
          <Tabs as={TabsLayout}>
            <TabList as={TabsListLayout}>
              <Tab as={ReportTitle}>Words Complexity Rating</Tab>
              <Tab as={ReportTitle}>Files Complexity Rating</Tab>
              <Tab as={ReportTitle}>Degradation Speed Rating</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <StatementsRatingRadial
                  data={buildWordsRating(JSON.parse(reportJSON))}
                />
              </TabPanel>
              <TabPanel>
                <FilesRatingChart data={filesRatings.byComplexity} />
              </TabPanel>
              <TabPanel>
                <DegradationSpeedChart data={filesRatings.byDegradationSpeed} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ReportContainer>
      </ProjectStatsContainer>
    </AppContainer>
  );
};
