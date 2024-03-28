import { useSearch } from '@dopt/ai-assistant-react';

import { useState } from 'react';

export function useHelpHub(
  sid: string,
  query?: string
): ReturnType<typeof useSearch> & {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [open, setOpen] = useState<boolean>(false);

  if (query == null) {
    query = `The user is on the ${document.title} page of the product. The url of the page is ${document.URL}. Can you tell me about the concepts on this page?`;
  }

  const { documents } = useSearch(sid, {
    query: open ? query : undefined,
    context: {
      document: true,
      visual: true,
    },
  });

  return {
    documents,
    open,
    setOpen,
  };
}
