import React, { useId, useState, useEffect } from 'react';
import { ImageIcon, FileText, X, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';

export interface FileUploadFieldProps {
  type: 'image' | 'pdf' | 'document';
  previewUrl: string | null;
  onClear: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  id?: string;
  className?: string;
  accept?: string;
  maxSizeMB?: number;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  type,
  previewUrl,
  onClear,
  onChange,
  error,
  isLoading = false,
  disabled = false,
  label,
  required = false,
  id: providedId,
  className,
  accept,
  maxSizeMB = 5,
}) => {
  const generatedId = useId();
  const fieldId = providedId || `file-upload-${generatedId}`;
  const isImage = type === 'image';
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    if (previewUrl) {
      setImageError(false);
    }
  }, [previewUrl]);

  const acceptValue = accept || (isImage
    ? '.jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif'
    : type === 'pdf'
      ? '.pdf,application/pdf'
      : '.pdf,.doc,.docx,.odt,application/pdf');

  const description = isImage
    ? `PNG, JPG, WEBP${accept?.includes('gif') ? ', GIF' : ''} (MAX. ${maxSizeMB}MB)`
    : type === 'pdf'
      ? `PDF only (MAX. ${maxSizeMB}MB)`
      : `PDF, DOC, DOCX (MAX. ${maxSizeMB}MB)`;

  const Icon = isImage ? ImageIcon : FileText;

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg bg-gray-50", className)}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center space-x-1">
          <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {required && <span className="text-red-500">*</span>}
        </div>
      )}

      {previewUrl ? (
        <div
          className={cn(
            isImage
              ? "relative flex justify-center"
              : "flex items-center p-3 border rounded-md bg-gray-50"
          )}
          aria-live="polite"
        >
          {isImage ? (
            <>
              <div className="w-32 h-32 relative rounded-lg overflow-hidden border border-gray-200">
                {imageError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-2 text-center">
                    <AlertCircle className="h-8 w-8 text-red-500 mb-1" />
                    <span className="text-xs text-gray-500">Failed to load image</span>
                  </div>
                ) : (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    sizes="128px"
                  />
                )}
              </div>
              <Button
                type="button"
                onClick={onClear}
                disabled={disabled}
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <FileText className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
              <span className="text-sm truncate flex-1" title={previewUrl}>{previewUrl}</span>
              <Button
                type="button"
                onClick={onClear}
                disabled={disabled}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700 ml-2 p-1 h-auto"
                aria-label="Remove document"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={fieldId}
            className={cn(
              "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg",
              disabled
                ? "bg-gray-100 border-gray-300 cursor-not-allowed"
                : "bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-primary/50 transition-colors cursor-pointer"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Icon className="w-8 h-8 mb-3 text-gray-400" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
            <input
              id={fieldId}
              name={fieldId}
              type="file"
              className="hidden"
              accept={acceptValue}
              onChange={onChange}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={error ? `${fieldId}-error` : undefined}
            />
          </label>
        </div>
      )}

      {error && (
        <p
          id={`${fieldId}-error`}
          className="mt-1 text-sm text-red-600 flex items-center"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 mr-1 inline" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUploadField;
