var fs = require('fs');
var peggy = require('peggy');
var tspegjs = require('ts-pegjs');

fs.readFile('src/parser/parser.pegjs', function (err, data) {
  if (err) throw err;
  var parser = peggy.generate(data.toString(), {
    output: 'source',
    // Helps in debugging
    // trace: true,
    cache: true,
    plugins: [tspegjs],
    tspegjs: {
      customHeader: '// @ts-nocheck',
    },
    returnTypes: {
      startRuleFunctions: 'object',
      startRuleFunction: 'object',
      please: 'object',
      argument: 'object',
      argument_list: 'object',
      lsep: 'object',
      colon: 'object',
      pkg_expr: 'object',
      pkg_glob: 'object',
      identifier: 'object',
      _: 'object',
    },
  });
  fs.writeFileSync('src/parser/index.ts', parser);
});
