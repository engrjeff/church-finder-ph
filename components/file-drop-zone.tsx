/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { Cross2Icon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useList } from '@uidotdev/usehooks';
import { useDropzone } from 'react-dropzone';

import { cn, removeDuplicates } from '@/lib/utils';
import useFileUpload from '@/hooks/useFileUpload';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface FileItem {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface FileDropZoneProps {
  fileData?: FileItem[];
  onSave: (fileData: FileItem[]) => void;
  onRemoveExisting: (index: number) => void;
  onClearAll: () => void;
  maxItems?: number;
}

function FileDropZone({
  fileData,
  onSave,
  onRemoveExisting,
  onClearAll,
  maxItems = 6,
}: FileDropZoneProps) {
  const [files, filesMethods] = useList<File>([]);

  const { uploadFiles, loading } = useFileUpload();

  const existingFileNames = new Set(fileData?.map((f) => f.name));

  const {
    acceptedFiles,
    fileRejections,
    isDragActive,
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: maxItems,
    accept: {
      'image/*': [],
    },

    onDrop: (acceptedFiles) => {
      // avoid duplicates
      const fileItems = [...files, ...acceptedFiles].filter(
        (f) => !existingFileNames.has(f.name)
      );
      filesMethods.set(removeDuplicates(fileItems, 'name'));
    },
  });

  const handleUpload = async () => {
    const uniqueFilesFromCurrent = new Set(fileData?.map((f) => f.name));

    const toBeUploaded = files.filter(
      (f) => !uniqueFilesFromCurrent.has(f.name)
    );

    const uploadedFiles = await uploadFiles(toBeUploaded);

    if (uploadedFiles) {
      if (fileData) {
        const unique = removeDuplicates(uploadedFiles.concat(fileData), 'name');
        onSave(unique);
      } else {
        onSave(uploadedFiles);
      }
    }

    filesMethods.clear();
  };

  const currentTotal = fileData ? fileData.length + files.length : files.length;

  const alertShown =
    fileRejections.length > maxItems || currentTotal > maxItems;

  const clearAll = () => {
    onClearAll();
    filesMethods.clear();
  };

  return (
    <div>
      {alertShown ? (
        <Alert className="my-6 rounded border border-amber-600 bg-amber-600/10 text-amber-600">
          <AlertTitle>
            <ExclamationTriangleIcon className="mr-2 inline size-4" />
            Too many files
          </AlertTitle>
          <AlertDescription>
            Kindly upload a maximum of {maxItems} files only.
          </AlertDescription>
        </Alert>
      ) : null}

      <ul className="my-6 grid grid-cols-3 gap-4 empty:hidden">
        {fileData?.map((file, index) => (
          <li key={file.name}>
            <ImageListItem
              fileItem={file as unknown as File}
              url={file.url}
              onRemove={() => onRemoveExisting(index)}
            />
          </li>
        ))}
        {files
          .filter((f) => !existingFileNames.has(f.name))
          .map((file, index) => (
            <li key={file.name}>
              <ImageListItem
                fileItem={file}
                onRemove={() => filesMethods.removeAt(index)}
              />
            </li>
          ))}

        <li>
          {currentTotal >= maxItems ? null : (
            <div
              {...getRootProps()}
              className={cn(
                'border p-6 flex items-center justify-center flex-col h-full cursor-pointer  border-dashed text-center rounded transition-colors hover:border-primary hover:bg-primary/20',
                isDragActive ? 'border-primary bg-primary/20' : '',
                currentTotal >= maxItems ? 'pointer-events-none opacity-60' : ''
              )}
            >
              <input {...getInputProps()} />
              <p className="text-sm">Click to select files, or</p>
              <p className="mb-3 text-sm">Drag n drop image files here</p>
              <em className="text-sm text-muted-foreground">
                (Maximum of {maxItems} images)
              </em>
            </div>
          )}
        </li>
      </ul>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="shadow-none"
          onClick={clearAll}
          disabled={loading}
        >
          Clear All
        </Button>
        <Button
          type="button"
          size="lg"
          className="shadow-none"
          disabled={files.length === 0 || loading || alertShown}
          onClick={handleUpload}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
}

export default FileDropZone;

interface ImageListItemProps {
  fileItem: File;
  url?: string;
  onRemove: () => void;
}

const ImageListItem = ({ fileItem, url, onRemove }: ImageListItemProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(url);

  useEffect(() => {
    if (!fileItem || url) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(fileItem);
  }, [fileItem, url]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border bg-black">
      <img
        className="size-full object-contain"
        src={previewUrl}
        alt={fileItem.name}
      />
      <div className="hidden space-y-3 p-4">
        <h6 className="text-sm font-medium">{fileItem.name}</h6>
        <p className="text-xs text-muted-foreground">{fileItem.size}</p>
      </div>
      <div className="absolute right-1 top-1">
        <Button
          type="button"
          size="icon"
          className="rounded-full bg-black/30 hover:bg-black/40"
          onClick={onRemove}
        >
          <span className="sr-only">remove photo</span>
          <Cross2Icon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
