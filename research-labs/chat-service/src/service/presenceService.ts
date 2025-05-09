import { WSEventEmitter } from './eventEmitter';
import { ConnectionManager } from './connectionManager';

export type PresenceStatus = 'online' | 'away' | 'offline' | 'invisible';

export interface UserPresence {
  userId: string;
  status: PresenceStatus;
  lastUpdated: Date;
}

export class PresenceService {
  private presenceStore: Map<string, UserPresence> = new Map();
  private connectionManager: ConnectionManager;
  private eventEmitter: WSEventEmitter;

  constructor(connectionManager: ConnectionManager, eventEmitter: WSEventEmitter) {
    this.connectionManager = connectionManager;
    this.eventEmitter = eventEmitter;

    this.registerEventListeners();
  }

  private registerEventListeners(): void {
    //@ts-ignore
    this.eventEmitter.on('connection:added', (data) => {
      const { userId } = data;
      this.updateUserPresence(userId, 'online');
    });

    //@ts-ignore
    this.eventEmitter.on('connection:removed', (data) => {
      const { userId } = data;
      if (!this.connectionManager.isUserConnected(userId)) {
        this.updateUserPresence(userId, 'offline');
      }
    });

    //@ts-ignore
    this.eventEmitter.on('presence:update', (data) => {
      const { userId, status } = data;
      this.updateUserPresence(userId, status as PresenceStatus);
    });
  }

  updateUserPresence(userId: string, status: PresenceStatus): void {
    if (status !== 'offline' && !this.connectionManager.isUserConnected(userId)) {
      status = 'offline';
    }

    const presence: UserPresence = {
      userId,
      status,
      lastUpdated: new Date()
    };

    this.presenceStore.set(userId, presence);

    this.broadcastPresenceUpdate(userId, status);
  }

  getUserPresence(userId: string): UserPresence {
    return this.presenceStore.get(userId) || {
      userId,
      status: 'offline',
      lastUpdated: new Date()
    };
  }

  getUsersPresence(userIds: string[]): UserPresence[] {
    return userIds.map(userId => this.getUserPresence(userId));
  }

  getOnlineUsers(): UserPresence[] {
    return Array.from(this.presenceStore.values())
      .filter(presence => presence.status !== 'offline' && presence.status !== 'invisible'); // invisible admin
  }

  private broadcastPresenceUpdate(userId: string, status: PresenceStatus): void {
    this.eventEmitter.emit('presence:broadcast', {
      userId,
      status,
      timestamp: new Date().toISOString()
    });
  }
}
/*
 * Getting stored in a redis container 
*/
