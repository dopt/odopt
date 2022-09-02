function Node(ast, type, value, children) {
  this.type = type;
  this.value = value;
  if (ast) {
    this.ast = true;
  }
  if (children) {
    this.children = children;
  }
}

function node(isASTNode, type, value, children) {
  return new Node(isASTNode, type, value, children);
}

const types = {
  ARGUMENT: 'argument',
  PACKAGE_LIST: 'package-list',
  COMMAND: 'command',
  SYM: 'symbol',
  PACKAGE_LITERAL: 'package-literal',
  PACKAGE_GLOB: 'package-glob',
  ROOT: 'root',
  WHITESPACE: 'whitespace',
};

module.exports = {
  node,
  Node,
  types,
};
