/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { ImageIcon } from '@radix-ui/react-icons';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FormDescription, FormLabel } from '@/components/ui/form';

interface AvatarPickerProps {
  src?: string;
  label: string;
  desc: string;
  onChange: (file: File, src: string) => void;
}

const AvatarPicker = ({ src, label, desc, onChange }: AvatarPickerProps) => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'image/*': [],
      },
      multiple: false,
      onDrop(acceptedFiles, fileRejections, event) {
        const previewUrl = URL.createObjectURL(acceptedFiles[0]);
        onChange(acceptedFiles[0], previewUrl);
      },
    });

  React.useEffect(() => {
    if (!src) return;
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(src);
  }, [src]);

  return (
    <>
      <div className={cn('flex items-center gap-4')}>
        <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-full border-4">
          {src ? (
            <img
              src={src}
              alt={acceptedFiles[0]?.name}
              className="absolute inset-0 size-24 rounded-full object-cover"
            />
          ) : (
            <ImageIcon className="inset-0 size-8 text-border transition-colors group-hover:text-primary" />
          )}
        </div>

        <div>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{desc}</FormDescription>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-2"
            >
              Browse Photo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarPicker;
