'use client';

import { type ComponentProps } from 'react';
import Link from 'next/link';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import StatusIcon from '@/components/status-icon';

function CreateChurchSuccessDialog({
  churchId,
  ...props
}: ComponentProps<typeof AlertDialog> & { churchId?: string }) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent className="max-w-sm space-y-3">
        <AlertDialogHeader className="items-center">
          <StatusIcon status="success" />
          <AlertDialogTitle className="pt-3">
            Your church was successfully saved!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You may now add more details of your church. Start by adding your
            church&apos;s profile.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Link href="/me/church">Cancel</Link>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href={`/me/church/${churchId}/edit?step=church-profile`}>
              Add Church Profile
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateChurchSuccessDialog;
