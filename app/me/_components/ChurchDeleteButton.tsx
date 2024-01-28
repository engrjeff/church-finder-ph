'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { churchApi } from '@/lib/apiClient';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

function ChurchDeleteButton({ name, id }: { name: string; id: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await churchApi.basicInfo.remove(id);

      toast.success('Church deleted!');

      setOpen(false);

      router.replace('/me/church');
    } catch (error) {
      toast.error('An error occured in deleting this church.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete</AlertDialogTitle>
          <AlertDescription className="mb-4">
            Are you sure you want to <strong>{name}</strong>?
          </AlertDescription>

          <Alert className="border-none bg-red-500/20 text-red-600">
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>This action cannot be undone.</AlertDescription>
          </Alert>
        </AlertDialogHeader>
        <AlertDialogFooter
          className={cn(loading ? 'pointer-events-none opacity-60' : '')}
        >
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ChurchDeleteButton;
