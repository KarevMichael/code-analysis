const IS_FILE = /^.*[.](js|ts)$/;

function createNode(path, tree, data) {
  const name = path.shift();
  const idx = tree.findIndex((e) => {
    return e.name === name;
  });
  if (idx < 0) {
    tree.push(
      !IS_FILE.test(name)
        ? {
            name,
            type: "folder",
            children: [],
          }
        : {
            name,
            type: "file",
            ...data
          }
    );
    if (path.length !== 0) {
      createNode(path, tree[tree.length - 1].children, data);
    }
  } else {
    createNode(path, tree[idx].children, data);
  }
}

export default function parse(data) {
  const tree = [];
  for (let i = 0; i < data.length; i++) {
    const path = data[i].filePath;
    const split = path.split("/");
    createNode(split, tree, data[i]);
  }
  return tree;
}

export const treeBuilder = (report) => {
  return parse(report);
};
