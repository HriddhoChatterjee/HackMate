const resources = [
  ['GitHub', 'https://github.com/', 'Repository and collaboration'],
  ['Figma', 'https://www.figma.com/', 'Design and review screens'],
  ['Postman', 'https://www.postman.com/', 'Test the backend APIs'],
  ['Render', 'https://render.com/', 'Deployment and hosting'],
];

export default function Resources() {
  return <section className="workspace-page"><header className="page-heading"><div><span className="eyebrow">WORKSPACE</span><h1>Shared Resources</h1><p>Keep the tools your team uses in one place.</p></div></header><div className="resource-grid">{resources.map(([name, url, description]) => <a className="resource-card" href={url} target="_blank" rel="noreferrer" key={name}><span className="resource-icon">↗</span><h2>{name}</h2><p>{description}</p></a>)}</div></section>;
}
