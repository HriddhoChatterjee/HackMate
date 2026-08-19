import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMessages, sendMessage } from '../../services/workspaceService';
import useWebSocket from '../../hooks/useWebSocket';

export default function Chat() {
  const { teamId = '1' } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => getMessages(teamId).then(setMessages).catch(() => setError('Could not load messages.')), [teamId]);
  useEffect(() => { load(); }, [load]);

  const handleSocketMessage = useCallback(() => { load(); }, [load]);
  const { connected } = useWebSocket(teamId, handleSocketMessage);

  const submit = async (event) => {
    event.preventDefault();
    if (!content.trim()) return;
    try {
      const message = await sendMessage({ team_id: Number(teamId), content });
      setMessages((current) => [...current, message]);
      setContent('');
    } catch { setError('Could not send the message.'); }
  };

  return <section className="workspace-page"><header className="page-heading"><div><span className="eyebrow">TEAM CHAT</span><h1>Chat</h1><p>Coordinate with your teammates before the next commit.</p></div><span className={`connection ${connected ? 'online' : ''}`}>{connected ? 'Live' : 'Offline'}</span></header>{error && <div className="alert">{error}</div>}<div className="chat-panel"><div className="chat-history">{messages.map((message) => <div className="chat-bubble" key={message.message_id}><span>User #{message.user_id}</span><p>{message.content}</p></div>)}{!messages.length && <p className="muted">No messages yet. Start the conversation.</p>}</div><form className="chat-input" onSubmit={submit}><input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Message your team…" maxLength={2000} /><button className="primary-btn">Send</button></form></div></section>;
}
