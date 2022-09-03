// JS Utilities

{
  var ast = require('./ast')
  var types = ast.types
}

please 
  = a:identifier b: (_ argument)* {
    return ast.node(1, types.ROOT, text(), [
      ast.node(1, types.COMMAND, 'please', b.map(b => b[1]))
    ])
  }

argument
  = a:command b: (_ colon) c: (_ pkg_list) { 
    return ast.node(1, types.COMMAND, a.value, c[1]); 
  }

pkg_list 
  = a:pkg_expr b: (_ lsep _ pkg_expr)* { 
    return ast.node(1, types.PACKAGE_LIST, text(), [a, ...b.map(b => b[3])]); 
  }



lsep   "list_separator" = a:',' { return ast.node(0, types.SYM, a); }
colon  "colon"          = a:':' { return ast.node(0, types.SYM, a); }

pkg_expr
  = a:'@' scope:[a-z0-9-~][a-z0-9-._~]* b: '/' pkg:[a-z0-9-~][a-z0-9-._~]*  {
    return ast.node(1, types.PACKAGE_LITERAL, text())
  }
  / pkg:[a-z0-9-~][a-z0-9-._~]*  {
    return ast.node(1, types.PACKAGE_LITERAL, text())
  }
  / pkg_glob

pkg_glob 
  = a:'{' id:('\\}'/[^\}])* b:'}' {
    return ast.node(1, types.PACKAGE_GLOB, text())
  }

// Terminals

command 
= a:[A-Za-z_] b:[A-Za-z_0-9-]* {
    return ast.node(1, types.COMMAND, text());
  }

identifier 
= a:[A-Za-z_] b:[A-Za-z_0-9]* {
    return ast.node(1, types.ID, text());
  }

_ "whitespace"
  = a:[ \r\n\t]* { return ast.node(0, types.WHITESPACE, ' '); }
