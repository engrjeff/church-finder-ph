'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type PublishStatus } from '@prisma/client';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';

import { churchApi } from '@/lib/apiClient';
import { errorHandler } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Spinner from '@/components/spinner';

interface Props {
  churchId: string;
  churchStatus: PublishStatus;
  isPublishable: boolean;
}

function ChurchPublishButton({ churchId, churchStatus, isPublishable }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async (status: PublishStatus) => {
    try {
      if (status === churchStatus) return;

      setIsLoading(true);
      const response = await churchApi.basicInfo.update(churchId, { status });

      if (response.data.status === 'success') {
        const msg = `The church was marked as ${status.toLowerCase()}`;
        toast.success(msg);

        router.refresh();
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="menu" disabled={isLoading} variant="secondary">
          {isLoading ? (
            <>
              <Spinner /> <span className="ml-2 text-xs">Updating...</span>
            </>
          ) : (
            <span className="mr-2 text-xs capitalize">
              {churchStatus.toLowerCase()}
            </span>
          )}
          <ChevronDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleStatusUpdate('DRAFT')}>
            Draft
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!isPublishable}
            onClick={() => handleStatusUpdate('PUBLISHED')}
          >
            Publish
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusUpdate('INACTIVE')}>
            Mark as Inactive
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ChurchPublishButton;
