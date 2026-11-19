import { io } from 'socket.io-client';
import { baseUrl } from '../../baseurl.js';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

let socketInstance = null;

/**
 * Initialize or get client Socket.IO connection
 * @param {string|null} customToken - Optional auth token, defaults to localStorage 'authToken'
 * @returns {import('socket.io-client').Socket}
 */
export const initSocket = (customToken = null) => {
  const token = customToken || localStorage.getItem('authToken');

  // If socket exists
  if (socketInstance) {
    // If token was provided or updated, reconnect with new token
    if (token && socketInstance.auth?.token !== token) {
      socketInstance.auth = { token };
      socketInstance.disconnect().connect();
      return socketInstance;
    }
    // If already connected, reuse instance
    if (socketInstance.connected) {
      return socketInstance;
    }
    // Otherwise reconnect
    if (token) {
      socketInstance.auth = { token };
    }
    socketInstance.connect();
    return socketInstance;
  }

  // Create new socket connection
  socketInstance = io(baseUrl, {
    auth: {
      token: token || undefined,
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
    timeout: 20000,
  });

  socketInstance.on('connect', () => {
    console.log('⚡ [Socket.IO] Connected to backend server:', socketInstance.id);
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        const uId = u?._id || u?.id;
        if (uId) {
          socketInstance.emit('identify', { userId: uId, customUserId: u?.userId });
        }
      }
    } catch (_) {}
  });

  socketInstance.on('connected', (data) => {
    console.log('⚡ [Socket.IO] Handshake confirmed:', data);
  });

  socketInstance.on('connect_error', (error) => {
    console.warn('⚠️ [Socket.IO] Connection error:', error.message);
  });

  socketInstance.on('disconnect', (reason) => {
    console.log('🔌 [Socket.IO] Disconnected:', reason);
  });

  // Default real-time event listeners with subtle toast notifications
  socketInstance.on('notification', (payload) => {
    if (payload?.message) {
      toast.info(payload.message);
    }
  });

  socketInstance.on('document_status_updated', (payload) => {
    const isApproved = payload?.status === 'approved';
    const msg = isApproved
      ? `Document "${payload.fileName}" has been approved!`
      : `Document "${payload.fileName}" status updated: ${payload.status}${
          payload.rejectionReason ? ` (${payload.rejectionReason})` : ''
        }`;
    if (isApproved) {
      toast.success(msg);
    } else {
      toast.warn(msg);
    }
  });

  socketInstance.on('ticket_message', (payload) => {
    if (payload?.sender === 'admin' && payload?.message) {
      toast.info(`New message on support ticket: "${payload.message.substring(0, 50)}..."`);
    }
  });

  socketInstance.on('ticket_status_updated', (payload) => {
    toast.info(`Support ticket status changed to: ${payload?.status}`);
  });

  return socketInstance;
};

/**
 * Get the current socket instance
 */
export const getSocket = () => {
  return socketInstance;
};

/**
 * Disconnect socket cleanly
 */
export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

/**
 * Join a room
 * @param {string} room
 * @returns {Promise<any>}
 */
export const joinRoom = (room) => {
  return new Promise((resolve) => {
    const socket = initSocket();
    socket.emit('join_room', room, (ack) => {
      resolve(ack);
    });
  });
};

/**
 * Leave a room
 * @param {string} room
 * @returns {Promise<any>}
 */
export const leaveRoom = (room) => {
  return new Promise((resolve) => {
    if (!socketInstance) return resolve({ success: true });
    socketInstance.emit('leave_room', room, (ack) => {
      resolve(ack);
    });
  });
};

/**
 * React hook to access socket and connection state in components
 */
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socketInstance?.connected || false);
  const [socket, setSocket] = useState(socketInstance);

  useEffect(() => {
    const s = initSocket();
    setSocket(s);
    setIsConnected(s.connected);

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    s.on('connect', handleConnect);
    s.on('disconnect', handleDisconnect);

    return () => {
      s.off('connect', handleConnect);
      s.off('disconnect', handleDisconnect);
    };
  }, []);

  return { socket, isConnected };
};

export default {
  initSocket,
  getSocket,
  disconnectSocket,
  joinRoom,
  leaveRoom,
  useSocket,
};
