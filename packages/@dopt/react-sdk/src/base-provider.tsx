import { MockProviderConfig, ProviderConfig } from './types';
import { MockDoptProvider } from './mock-provider';
import { DoptProvider } from './provider';
import { isMockProviderProps } from './utils';

export function BaseDoptProvider(props: ProviderConfig | MockProviderConfig) {
  if (isMockProviderProps(props)) {
    return <MockDoptProvider {...props} />;
  } else {
    return <DoptProvider {...props} />;
  }
}
