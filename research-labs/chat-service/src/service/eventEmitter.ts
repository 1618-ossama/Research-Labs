export class WSEventEmitter {
  private handlers: Map<string, Function[]> = new Map();

  on(event: string, handler: Function): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)?.push(handler);
  }

  emit(event: string, data: any): void {
    if (this.handlers.has(event)) {
      this.handlers.get(event)?.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in event handler for ${event}:`, error);
        }
      });
    }
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.handlers.delete(event);
    } else {
      this.handlers.clear();
    }
  }
}

/**
 * WSEventEmitter is a lightweight implementation of the publisher-subscriber pattern
 * for WebSocket communication. It allows components to subscribe to named events
 * and publish events that will be delivered to all subscribers.
 * 
 * Example usage:
 * ```
 * const emitter = new WSEventEmitter();
 * 
 * // Subscribe to an event
 * emitter.on('user:login', (data) => {
 *   console.log(`User ${data.userId} logged in`);
 * });
 * 
 * // Publish an event
 * emitter.emit('user:login', { userId: '123', timestamp: new Date() });
 * ```
 */
