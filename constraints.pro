% Enforces that a dependency doesn't appear in both `dependencies` and `devDependencies`
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, null, 'devDependencies') :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, 'devDependencies'),
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, 'dependencies').

% Enforce existence of build scripts in non-private workspaces
gen_enforced_field(WorkspaceCwd, 'scripts.build', '<any value>') :-
  workspace(WorkspaceCwd),
  % Only if they don't have a script set
    \+ workspace_field(WorkspaceCwd, 'scripts.build', _),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

% Enforce consistent clean scripts in non-private workspaces
gen_enforced_field(WorkspaceCwd, 'scripts.clean', 'shx rm -rf ./dist') :-
  workspace(WorkspaceCwd),
  % This package has no src and dist
    \+ workspace_ident(WorkspaceCwd, '@dopt/check-formatting'),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

% Enforce consistent format scripts in non-private workspaces
gen_enforced_field(WorkspaceCwd, 'scripts.format', 'ARGS=${ARGS:-'--w .'} && prettier $ARGS') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

% Enforce consistent lint scripts in non-private workspaces
gen_enforced_field(WorkspaceCwd, 'scripts.lint', 'eslint') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

% Enforce consistent exports for publishable workspaces
gen_enforced_field(WorkspaceCwd, 'exports', '{ ".": { "require": "./dist/index.js", "import": "./dist/index.mjs", "types": "./dist/index.d.ts" } }') :-
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

% Enforce main field consistent for publishable workspaces
gen_enforced_field(WorkspaceCwd, 'main', './dist/index.js') :-
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

% Enforce module field consistent for publishable workspaces
gen_enforced_field(WorkspaceCwd, 'module', './dist/index.mjs') :-
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').
    
% Enforce types field consistent for publishable workspaces
gen_enforced_field(WorkspaceCwd, 'types', './dist/index.d.ts') :-
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').
