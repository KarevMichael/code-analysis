import useFetch from "fetch-suspense";
import Tree from "./Tree";
import {treeBuilder} from "./utils/treeBuilder";

export const LazyReportTree = () => {
  const report = useFetch("/report");
  if(!report) {
    return null;
  }
  return <Tree data={treeBuilder(JSON.parse(report))}/>;
};
