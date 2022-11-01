export function getBlockDefaultState(identifier: string) {
  return {
    active: false,
    completed: false,
    exited: false,
    started: false,
    stopped: false,
    uuid: identifier,
  };
}
