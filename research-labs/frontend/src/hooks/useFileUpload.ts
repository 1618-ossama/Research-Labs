import { useState, useCallback, useEffect } from 'react'

export type FileUploadType = 'image' | 'pdf' | 'document'

export interface UseFileUploadProps {
  type: FileUploadType
  maxSize?: number
  acceptedTypes?: string[]
  onChange?: (file: File | null) => void
  initialFile?: File | null
  onError?: (error: string) => void
}

export interface UseFileUpload {
  file: File | null
  previewUrl: string | null
  isLoading: boolean
  error: string | null
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearFile: () => void
}

export const DEFAULT_MAX_SIZE = 5 * 1024 * 1024
export const ACCEPTED_TYPES = {
  pdf: ['application/pdf'],
  image: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ],
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.oasis.opendocument.text'
  ]
}

const useFileUpload = ({
  type,
  maxSize = DEFAULT_MAX_SIZE,
  acceptedTypes = ACCEPTED_TYPES[type],
  onChange,
  initialFile = null,
  onError
}: UseFileUploadProps): UseFileUpload => {
  const [file, setFile] = useState<File | null>(initialFile)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage)
    if (onError) {
      onError(errorMessage)
    }
  }, [onError])

  const generatePreview = useCallback((selectedFile: File | null) => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    if (type === 'image') {
      setIsLoading(true)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
        setIsLoading(false)
      }
      reader.onerror = () => {
        handleError('Failed to generate preview')
        setIsLoading(false)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreviewUrl(selectedFile.name)
    }
  }, [type, handleError])

  const clearFile = useCallback(() => {
    setFile(null)
    setPreviewUrl(null)
    setError(null)
    if (onChange) {
      onChange(null)
    }
  }, [onChange])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setError(null)

    if (!selectedFile) {
      clearFile()
      return
    }

    if (selectedFile.size > maxSize) {
      const sizeInMB = maxSize / (1024 * 1024)
      handleError(`File must be less than ${sizeInMB}MB (current size: ${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB)`)
      clearFile()
      return
    }

    if (!acceptedTypes.includes(selectedFile.type)) {
      const acceptedExtensions = acceptedTypes
        .map(type => type.split('/')[1])
        .join(', ');
      handleError(`Only ${acceptedExtensions} formats are supported`)
      clearFile()
      return
    }

    setFile(selectedFile)
    generatePreview(selectedFile)
    if (onChange) {
      onChange(selectedFile)
    }
  }, [maxSize, acceptedTypes, onChange, clearFile, generatePreview, handleError])

  useEffect(() => {
    if (initialFile) {
      setFile(initialFile)
      generatePreview(initialFile)
    }
  }, [initialFile, generatePreview])

  return {
    file,
    previewUrl,
    isLoading,
    error,
    handleFileChange,
    clearFile
  }
}

export default useFileUpload
