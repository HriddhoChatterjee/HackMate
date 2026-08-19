import { useEffect, useRef, useState } from 'react';

export default function useWebSocket(teamId, onMessage) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!teamId) return undefined;
    const base = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';
    const socket = new WebSocket(`${base}/ws/teams/${teamId}`);
    socketRef.current = socket;

    socket.onopen = () => setConnected(true);
    socket.onclose = () => setConnected(false);
    socket.onmessage = (event) => onMessage?.(event.data);

    return () => {
      socket.close();
      socketRef.current = null;
      setConnected(false);
    };
  }, [teamId, onMessage]);

  const send = (message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) socketRef.current.send(message);
  };

  return { connected, send };
}
