export interface Flow {
  readonly kind: 'flow';
  readonly type: 'flow';
  readonly uid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    exited: boolean;
    completed: boolean;
  };
}
