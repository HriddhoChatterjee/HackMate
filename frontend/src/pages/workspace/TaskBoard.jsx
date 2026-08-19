import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createTask, deleteTask, getTasks, updateTaskStatus } from '../../services/workspaceService';

const columns = ['Todo', 'In Progress', 'Completed'];

export default function TaskBoard() {
  const { teamId = '1' } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => getTasks(teamId).then(setTasks).catch(() => setError('Could not load tasks.')).finally(() => setLoading(false));
  useEffect(load, [teamId]);

  const grouped = useMemo(() => Object.fromEntries(columns.map((column) => [column, tasks.filter((task) => task.status === column)])), [tasks]);

  const addTask = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    try {
      const created = await createTask({ team_id: Number(teamId), ...form });
      setTasks((current) => [created, ...current]);
      setForm({ title: '', description: '', priority: 'Medium' });
    } catch { setError('Could not create the task.'); }
  };

  const move = async (taskId, status) => {
    try {
      const updated = await updateTaskStatus(taskId, status);
      setTasks((current) => current.map((task) => task.task_id === taskId ? updated : task));
    } catch { setError('Could not update task status.'); }
  };

  const remove = async (taskId) => {
    try { await deleteTask(taskId); setTasks((current) => current.filter((task) => task.task_id !== taskId)); }
    catch { setError('Could not delete task.'); }
  };

  return (
    <section className="workspace-page">
      <header className="page-heading"><div><span className="eyebrow">WORKSPACE</span><h1>Task Board</h1><p>Track the work from Todo to Completed.</p></div></header>
      {error && <div className="alert">{error}</div>}
      <form className="panel task-form" onSubmit={addTask}>
        <input placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>Low</option><option>Medium</option><option>High</option></select>
        <button className="primary-btn" type="submit">Add task</button>
      </form>
      {loading ? <div className="panel muted">Loading tasks…</div> : <div className="kanban">{columns.map((column) => <div className="kanban-column" key={column}><div className="column-title"><h2>{column}</h2><span>{grouped[column].length}</span></div>{grouped[column].map((task) => <article className="task-card" key={task.task_id}><div className="task-card-top"><strong>{task.title}</strong><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span></div><p>{task.description || 'No description'}</p><div className="task-actions">{column !== 'Todo' && <button onClick={() => move(task.task_id, 'Todo')}>Todo</button>}{column !== 'In Progress' && <button onClick={() => move(task.task_id, 'In Progress')}>Doing</button>}{column !== 'Completed' && <button onClick={() => move(task.task_id, 'Completed')}>Done</button>}<button className="danger" onClick={() => remove(task.task_id)}>Delete</button></div></article>)}</div>)}</div>}
    </section>
  );
}
