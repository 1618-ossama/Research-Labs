
Connection Management: Tracks and manages WebSocket connections with user limits
Authentication: JWT-based authentication for WebSocket connections
Presence Tracking: Real-time user presence status (online/away/busy/offline)
Notification System: Supports multiple notification types with real-time delivery
Message Handling: Middleware pipeline for processing incoming messages
Rate Limiting: Built-in rate limiting per user
Heartbeat Monitoring: Detects and removes inactive connections
Graceful Shutdown: Proper cleanup on server termination

### **1. Message Types**

Messages are structured data sent between the client and server, typically in JSON format. Here are the key message types used in the application:

#### **1.1 Chat Message Types**
- **`chat:send_message`**: 
  - **Purpose**: To send a new message in a conversation.
  - **Payload**: Contains the `conversationId` and the `text` of the message.
  
- **`chat:edit_message`**: 
  - **Purpose**: To edit an existing message.
  - **Payload**: Contains the `conversationId`, `messageId`, and the `newText` for the message.

- **`chat:delete_message`**: 
  - **Purpose**: To delete a message from a conversation.
  - **Payload**: Contains the `conversationId` and the `messageId` of the message to be deleted.

- **`chat:new_message`**: 
  - **Purpose**: To notify participants of a new message sent in a conversation.
  - **Payload**: Contains the details of the new message, including the message content and sender information.

- **`chat:message_updated`**: 
  - **Purpose**: To notify participants that a message has been updated.
  - **Payload**: Contains the updated message details.

- **`chat:message_deleted`**: 
  - **Purpose**: To notify participants that a message has been deleted.
  - **Payload**: Contains the `id` of the deleted message and the `conversationId`.

#### **1.2 Presence and Status Message Types**
- **`presence`**: 
  - **Purpose**: To update the presence status of a user (e.g., online or offline).
  - **Payload**: Contains the `status` of the user.

- **`typing`**: 
  - **Purpose**: To indicate that a user is typing in a conversation.
  - **Payload**: Contains the `conversationId` and a boolean `isTyping` status.

- **`ping`**: 
  - **Purpose**: To check the connection status between the client and server.
  - **Payload**: Typically includes a timestamp.

### **2. Event Types**

Events are actions or occurrences that the server or client can listen for and respond to. Here are the key event types used in the application:

#### **2.1 WebSocket Events**
- **`connection`**: 
  - **Purpose**: Triggered when a new WebSocket connection is established.
  - **Handler**: Sets up the connection, verifies the user, and manages the connection lifecycle.

- **`message`**: 
  - **Purpose**: Triggered when a message is received from a client.
  - **Handler**: Processes the incoming message based on its type and performs the appropriate action (e.g., sending, editing, or deleting a message).

- **`close`**: 
  - **Purpose**: Triggered when a WebSocket connection is closed.
  - **Handler**: Cleans up resources and updates user presence status.

- **`error`**: 
  - **Purpose**: Triggered when an error occurs in the WebSocket connection.
  - **Handler**: Logs the error and handles any necessary cleanup.

#### **2.2 Custom Application Events**
- **`presence:update`**: 
  - **Purpose**: Custom event to update the presence status of users.
  - **Payload**: Contains user ID and status (online/offline).

- **`conversation:typing`**: 
  - **Purpose**: Custom event to notify other users that someone is typing in a conversation.
  - **Payload**: Contains user ID, connection ID, conversation ID, and typing status.

- **`message:received`**: 
  - **Purpose**: Custom event to indicate that a message has been received and processed.
  - **Payload**: Contains details about the message and the connection.


