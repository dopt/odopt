export interface Flow {
  readonly kind: 'flow';
  readonly type: 'flow';
  readonly uuid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    started: boolean;
    exited: boolean;
    stopped: boolean;
    completed: boolean;
  };
}
