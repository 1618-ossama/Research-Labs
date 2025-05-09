import { Request, Response } from 'express';
import { WebSocketServer } from '../websocket/index';

const reportsDB: any[] = [];

export const createModerationController = (wsServer: WebSocketServer) => {
  return {

    reportContent: (req: Request, res: Response) => {
      try {
        const { reporterId, contentId, contentType, reason } = req.body;

        if (!reporterId || !contentId || !contentType || !reason) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const report = {
          id: Date.now().toString(),
          reporterId,
          contentId,
          contentType, // 'message', 'user', 'group'
          reason,
          status: 'pending',
          createdAt: new Date()
        };

        reportsDB.push(report);

        wsServer.sendToUser('ADMIN', {
          ...report,
          type: 'new_report',
        });

        res.status(201).json(report);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create report' });
      }
    },

    getReports: (req: Request, res: Response) => {
      try {
        const { status } = req.query;
        const filteredReports = status
          ? reportsDB.filter(r => r.status === status)
          : reportsDB;

        res.json(filteredReports);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reports' });
      }
    },

    // banUser: (req: Request, res: Response) => { ... },
    // warnUser: (req: Request, res: Response) => { ... }
    // deleteContent: (req: Request, res: Response) => { ... }
  };
};

export type ModerationController = ReturnType<typeof createModerationController>;
