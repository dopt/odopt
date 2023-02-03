import {
  Modal,
  ModalContent,
  ModalOverlay,
  type ModalProps,
} from '@chakra-ui/react';

export interface TipVideoProps extends Omit<ModalProps, 'children'> {}

export function TipVideo(props: TipVideoProps) {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/J---aiyznGQ?autoplay=true"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: 0 }}
        />
      </ModalContent>
    </Modal>
  );
}
