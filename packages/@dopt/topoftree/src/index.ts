import { execSync } from 'child_process';

const TOPOFTREE = execSync('git rev-parse --show-toplevel').toString().trim();

export { TOPOFTREE };
