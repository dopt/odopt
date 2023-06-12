import { useContext, useMemo } from 'react';
import { DoptContext } from './context';
import { createBlock } from './create-sdk-block';
import { Container } from './types';

/**
 * A React hook for accessing a container's state and
 * methods corresponding to an intent-based API for manipulating
 * said state.
 *
 * @example
 * ```tsx
 * import { useContainer } from "@dopt/react";
 * import { Modal } from "@your-company/modal";
 *
 * export function Application() {
 *   const container = useContainer("HNWvcT78tyTwygnbzU6SW");
 *   const onClick = useCallback(() => {
 *     container.transition('dismiss');
 *   }, [container]);
 *
 *   const activeChild = container.children[0].state.active ?
 *     container.children[0] : container.children[1];
 *
 *   const itemsComplete = container.children[0].state.active ?
 *     '0 items completed' : '1 item completed';
 *
 *   return (
 *     <main>
 *       <Modal isOpen={container.state.active}>
 *         <h1>{activeChild.field('title')}</h1>
 *         <p>{activeChild.field('body')}</p>
 *         <p>{itemsComplete}</p>
 *         <button onClick={onClick}>Close me</button>
 *       </Modal>
 *     </main>
 *   );
 * }
 * ```
 *
 * @param id - one of {@link Container['sid']} | {@link Container['uid']}
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns {@link Container} the state of the container and methods to manipulate container state
 *
 */
export function useContainer(id: string): Container {
  const { fetching, blocks, blockIntention, log, blockFields, blockUidBySid } =
    useContext(DoptContext);

  if (fetching) {
    log.info(
      'Accessing container prior to initialization will return default block states.'
    );
  }

  const uid = blockUidBySid.get(id) || id;
  const container = useMemo(() => {
    const container = createBlock({
      uid,
      fetching,
      blocks,
      blockFields,
      blockIntention,
    });

    const children = Object.values(blocks)
      .filter(({ containerUid }) => containerUid === container.uid)
      .map(({ uid }) =>
        createBlock({ uid, fetching, blocks, blockFields, blockIntention })
      );

    return { ...container, children };
  }, [uid, fetching, blocks, blockFields]);

  return container;
}
