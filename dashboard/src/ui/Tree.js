import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import last from 'lodash/last';
import flatten from 'lodash/flatten';
import { AiOutlineFile, AiOutlineFolder, AiFillAlert } from 'react-icons/ai';
import { DiJavascript1, DiReact } from 'react-icons/di';
import { WBox } from './WinBox';
import { WinBoxContent } from './WinBoxContent';

const FILE_ICONS = {
  js: <DiJavascript1 />,
  jsx: <DiReact />,
  ts: <DiJavascript1 />
};

const Box = styled.div`
  cursor: pointer;
`;

const StyledTree = styled.div`
  line-height: 1.5;
`;

const StyledFile = styled(Box)`
  padding-left: 20px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;

const StyledFolder = styled(Box)`
  padding-left: 20px;

  .folder--label {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
`;

const Collapsible = styled.div`
  height: ${(p) => (p.isOpen ? 'auto' : '0')};
  overflow: hidden;
`;

const File = ({ data }) => {
  const ext = last(data.name.split('.'));
  const [hide, setHide] = useState(true);
  const [wbWidth, setWbWidth] = useState(500);
  const onHide = useCallback(() => {
    setHide(!hide);
  }, [hide]);
  let lines;

  try {
    lines = flatten(data.statements.map((s) => s.lines));
  } catch {
    return (
      <StyledFile>
        <AiFillAlert />
        <span>Failed to load {data.filePath}</span>
      </StyledFile>
    );
  }

  return (
    <>
      {!hide && (
        <WBox
          width={wbWidth}
          title={data.filePath}
          onClose={onHide}
          onResize={(width) => {
            setWbWidth(width);
          }}
        >
          <WinBoxContent
            statements={data.statements}
            lines={lines}
            chartWidth={wbWidth}
            fileContent={data.fileContent}
          />
        </WBox>
      )}
      <StyledFile onClick={onHide}>
        {FILE_ICONS[ext] || <AiOutlineFile />}
        <span>{data.name}</span>
      </StyledFile>
    </>
  );
};

const Folder = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <StyledFolder>
      <div className="folder--label" onClick={handleToggle}>
        <AiOutlineFolder />
        <span>{name}</span>
      </div>
      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </StyledFolder>
  );
};

const TreeRecursive = ({ data }) => {
  return data.map((item) => {
    if (item.type === 'folder') {
      return (
        <Folder name={item.name} key={item.name}>
          <TreeRecursive data={item.children} />
        </Folder>
      );
    } else {
      return <File data={item} key={item.name} />;
    }
  });
};

const Tree = ({ data }) => {
  return (
    <StyledTree>
      <TreeRecursive data={data} />
    </StyledTree>
  );
};

Tree.File = File;
Tree.Folder = Folder;

export default Tree;
