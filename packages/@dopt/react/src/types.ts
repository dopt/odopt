import { LoggerProps } from '@dopt/logger';
import { ReactNode } from 'react';
import type { Block, Flow, BlockIntent, FlowIntent } from '@dopt/block-types';

/**
 * This type maps a Block's `uid` to the Block itself.
 *
 * This object is used internally within the {@link DoptProvider}.
 */
export type Blocks = Record<Block['uid'], Block>;

export type BlockIntentHandler = Record<
  BlockIntent,
  (uid: Block['uid'], goToUid?: Block['uid']) => void | undefined
>;

/**
 * This type maps a Flow's `uid` to the Flow itself.
 *
 * This object is used internally within the {@link DoptProvider}.
 */
export type Flows = Record<Flow['uid'], Flow>;

export type FlowIntentHandler = Record<
  FlowIntent,
  (uid: Flow['uid'], version: Flow['version']) => void | undefined
>;

/**
 * This type encapsulates Flow initialization status.
 * When a Flow is first fetched by Dopt, it will be in the pending state
 * (`pending: true`). Dopt will then evaluate whether a user qualifies
 * for a flow and if any state updates need to occur. When those are complete,
 * the status will be updated to `pending: false`. If any errors occur during
 * this process, the status will be additionally be updated to `failed: true`.
 */
export type FlowStatus = { pending: boolean; failed: boolean };

/**
 * Providing this configuration to the {@link DoptProvider} allows the
 * the SDK to fetch relevant data from the Dopt blocks API.
 */
export interface ProviderConfig {
  /**
   * The userId you're fetching block and flows for.
   */
  userId: string | undefined;
  /**
   * An optional groupId for that userId.
   */
  groupId?: string | undefined;
  /**
   * Your blocks API key.
   */
  apiKey: string;
  logLevel?: LoggerProps['logLevel'];
  /**
   * An object containing all flows and versions you'd like to fetch.
   */
  flowVersions: Record<string, number>;
  /**
   * A boolean which defines whether complete intents on step blocks should
   * optimistically update the client before hearing back that the change
   * has been committed.
   *
   * Within {@link DoptProvider}, this defaults to `true`.
   */
  optimisticUpdates?: boolean;
  /**
   * The children React elements of the DoptProvider.
   */
  children?: ReactNode;
}
