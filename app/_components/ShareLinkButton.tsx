'use client';

import { Share1Icon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';

function ShareLinkButton({ url }: { url: string }) {
  const handleClick = () => {
    if (navigator.clipboard) {
      const link = new URL(url, window.location.origin);
      navigator.clipboard.writeText(link.toString());

      toast.success('Link copied!');
    }
  };

  return (
    <button
      className="flex items-center rounded-full text-sm lg:hover:bg-white/10"
      onClick={handleClick}
    >
      <Share1Icon className="mr-3 size-4" />
      Share
    </button>
  );
}

export default ShareLinkButton;
