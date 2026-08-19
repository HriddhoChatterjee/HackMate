import { NavLink, Outlet, useParams } from 'react-router-dom';

const links = [
  ['Overview', ''],
  ['Tasks', 'tasks'],
  ['Chat', 'chat'],
  ['Resources', 'resources'],
];

export default function WorkspaceLayout() {
  const { teamId = '1' } = useParams();
  return (
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <div>
          <div className="brand">HackMate</div>
          <div className="workspace-label">TEAM WORKSPACE</div>
        </div>
        <nav>
          {links.map(([label, path]) => (
            <NavLink
              key={label}
              end={!path}
              to={path ? `/workspace/${teamId}/${path}` : `/workspace/${teamId}`}
              className={({ isActive }) => `workspace-nav ${isActive ? 'active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">Keep the build moving. Ship together.</div>
      </aside>
      <main className="workspace-main"><Outlet /></main>
    </div>
  );
}
