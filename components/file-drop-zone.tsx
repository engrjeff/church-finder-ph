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
  maxItems = 4,
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
      <div
        {...getRootProps()}
        className={cn(
          'py-10 border border-dashed text-center rounded transition-colors hover:border-primary hover:bg-primary/20',
          isDragActive ? 'border-primary bg-primary/20' : '',
          currentTotal >= maxItems ? 'pointer-events-none opacity-60' : ''
        )}
      >
        <input {...getInputProps()} />
        <p>Drag n drop image files here, or click to select files</p>
        <em className="text-sm text-muted-foreground">(Maximum of 4 images)</em>
      </div>

      {alertShown ? (
        <Alert className="mt-6 border border-amber-600 bg-amber-600/10 text-amber-600">
          <AlertTitle>
            <ExclamationTriangleIcon className="mr-2 inline h-4 w-4" />
            Too many files
          </AlertTitle>
          <AlertDescription>
            Kindly upload a maximum of {maxItems} files only.
          </AlertDescription>
        </Alert>
      ) : null}

      <ul className="mt-6 space-y-2">
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
    <div className="flex items-center gap-4 rounded border pr-4">
      <img
        className="h-20 w-20 object-cover"
        src={previewUrl}
        alt={fileItem.name}
      />
      <div className="space-y-3 p-4">
        <h6 className="text-sm font-medium">{fileItem.name}</h6>
        <p className="text-xs text-muted-foreground">{fileItem.size}</p>
      </div>
      <div className="ml-auto">
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <span className="sr-only">remove file</span>
          <Cross2Icon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
