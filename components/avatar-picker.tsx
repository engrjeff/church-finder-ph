/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { ImageIcon } from '@radix-ui/react-icons';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/lib/utils';
import useFileUpload from '@/hooks/useFileUpload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormDescription, FormLabel } from '@/components/ui/form';

interface AvatarPickerProps {
  src?: string;
  label: string;
  desc: string;
  onAfterUpload: (imageUrl: string) => void;
}

const AvatarPicker = ({
  src,
  label,
  desc,
  onAfterUpload,
}: AvatarPickerProps) => {
  const { uploadFiles, loading } = useFileUpload();

  const [previewSrc, setPreviewSrc] = React.useState<string | undefined>(src);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'image/*': [],
      },
      multiple: false,
      onDrop(acceptedFiles, fileRejections, event) {
        const previewUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreviewSrc(previewUrl);
      },
    });

  React.useEffect(() => {
    if (!previewSrc) return;
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(previewSrc);
  }, [previewSrc]);

  const handleUpload = async () => {
    const res = await uploadFiles(acceptedFiles);

    if (res && res.length > 0) {
      onAfterUpload(res[0].url);
      setDialogOpen(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          'flex items-center gap-4',
          loading ? 'pointer-events-none opacity-60' : ''
        )}
      >
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4">
          {src ? (
            <img
              src={src}
              alt={acceptedFiles[0]?.name}
              className="absolute inset-0 h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <ImageIcon className="inset-0 h-8 w-8 text-border transition-colors group-hover:text-primary" />
          )}
        </div>

        <div>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{desc}</FormDescription>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2"
              >
                Browse Photo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select an Image</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4">
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4">
                  {previewSrc ? (
                    <img
                      src={previewSrc}
                      alt={acceptedFiles[0]?.name}
                      className="absolute inset-0 h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="inset-0 h-8 w-8 text-border transition-colors group-hover:text-primary" />
                  )}
                </div>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Button variant="secondary">Pick Image</Button>
                </div>
              </div>
              <DialogFooter
                className={loading ? 'pointer-events-none opacity-60' : ''}
              >
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={!acceptedFiles || acceptedFiles.length === 0}
                >
                  {loading ? 'Uploading...' : 'Upload'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default AvatarPicker;
