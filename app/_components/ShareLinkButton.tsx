'use client';

import { Share1Icon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function ShareLinkButton({ url }: { url: string }) {
  const handleClick = () => {
    if (navigator.clipboard) {
      const link = new URL(url, window.location.origin);
      navigator.clipboard.writeText(link.toString());

      toast.success('Link copied!');
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full hover:bg-white/10"
            onClick={handleClick}
          >
            <Share1Icon className="mr-3 size-4" />
            Share
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share link</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ShareLinkButton;
