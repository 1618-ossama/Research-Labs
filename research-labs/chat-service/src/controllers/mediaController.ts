import { Request, Response } from 'express';

const filesDB: Record<string, any> = {};

export const initiateFileUpload = (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;
  const fileId = Date.now().toString();
  filesDB[fileId] = { fileName, fileType, status: 'pending' };
  res.json({ fileId, uploadUrl: `/upload/${fileId}` });
};

export const getFileMetadata = (req: Request, res: Response) => {
  const { fileId } = req.params;
  const file = filesDB[fileId];
  if (file) {
    res.json(file);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
};

export const deleteAttachment = (req: Request, res: Response) => {
  const { fileId } = req.params;
  if (filesDB[fileId]) {
    delete filesDB[fileId];
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
};
