import findWorkspaceRoot from 'find-yarn-workspace-root';

const TOPOFTREE = findWorkspaceRoot() as string;

export { TOPOFTREE };
