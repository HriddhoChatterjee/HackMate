import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMessages, getTasks, getWorkspace } from '../../services/workspaceService';

export default function Workspace() {
  const { teamId = '1' } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getWorkspace(teamId), getTasks(teamId), getMessages(teamId)])
      .then(([ws, taskList, messageList]) => {
        setWorkspace(ws);
        setTasks(taskList);
        setMessages(messageList);
      })
      .catch(() => setError('The workspace API is not available yet. Start FastAPI and try again.'));
  }, [teamId]);

  return (
    <section className="workspace-page">
      <header className="page-heading">
        <div>
          <span className="eyebrow">TEAM {teamId}</span>
          <h1>{workspace?.name || 'Team Workspace'}</h1>
          <p>{workspace?.description || 'A single place for tasks, conversations and shared resources.'}</p>
        </div>
        <Link className="primary-btn" to={`/workspace/${teamId}/tasks`}>Open task board</Link>
      </header>

      {error && <div className="alert">{error}</div>}

      <div className="workspace-grid">
        <article className="stat-card"><span>Tasks</span><strong>{tasks.length}</strong><small>Across the team board</small></article>
        <article className="stat-card"><span>Completed</span><strong>{tasks.filter((task) => task.status === 'Completed').length}</strong><small>Ready to ship</small></article>
        <article className="stat-card"><span>Messages</span><strong>{messages.length}</strong><small>Team conversation</small></article>
      </div>

      <div className="two-column">
        <article className="panel">
          <div className="panel-heading"><h2>Recent tasks</h2><Link to={`/workspace/${teamId}/tasks`}>View all</Link></div>
          {tasks.slice(0, 5).map((task) => <div className="list-row" key={task.task_id}><span>{task.title}</span><span className={`status-pill ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span></div>)}
          {!tasks.length && <p className="muted">No tasks yet. Add the first one from the board.</p>}
        </article>
        <article className="panel">
          <div className="panel-heading"><h2>Latest chat</h2><Link to={`/workspace/${teamId}/chat`}>Open chat</Link></div>
          {messages.slice(-5).reverse().map((message) => <div className="message-preview" key={message.message_id}><strong>User #{message.user_id}</strong><p>{message.content}</p></div>)}
          {!messages.length && <p className="muted">No messages yet.</p>}
        </article>
      </div>
    </section>
  );
}
