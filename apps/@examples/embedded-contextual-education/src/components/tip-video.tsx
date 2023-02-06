import {
  Modal,
  ModalContent,
  ModalOverlay,
  type ModalProps,
} from '@chakra-ui/react';

export interface TipVideoProps extends Omit<ModalProps, 'children'> {}

export function TipVideo(props: TipVideoProps) {
  return (
    <Modal size="3xl" {...props}>
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <iframe
          src="https://www.youtube.com/embed/J---aiyznGQ?autoplay=true&modestbranding=true&rel=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: 0, aspectRatio: '16 / 9' }}
        />
      </ModalContent>
    </Modal>
  );
}
