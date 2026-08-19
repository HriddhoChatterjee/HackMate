import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import OpportunityBoard from './pages/OpportunityBoard';
import OpportunityDetails from './pages/OpportunityDetails';
import CreateOpportunity from './pages/CreateOpportunity';
import TeamExplorer from './pages/TeamExplorer';
import TeamDetails from './pages/TeamDetails';
import CreateTeam from './pages/CreateTeam';
import Applications from './pages/Applications';
import Reviews from './pages/Reviews';
import Roadmaps from './pages/Roadmaps';
import MockHackathons from './pages/MockHackathons';
import WorkspaceLayout from './layouts/WorkspaceLayout';
import Workspace from './pages/workspace/Workspace';
import TaskBoard from './pages/workspace/TaskBoard';
import Chat from './pages/workspace/Chat';
import Resources from './pages/workspace/Resources';
import './styles-c-workspace.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/opportunities" element={<OpportunityBoard />} />
        <Route path="/opportunities/:id" element={<OpportunityDetails />} />
        <Route path="/opportunities/create" element={<CreateOpportunity />} />
        <Route path="/teams" element={<TeamExplorer />} />
        <Route path="/teams/:id" element={<TeamDetails />} />
        <Route path="/teams/create" element={<CreateTeam />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/mock-hackathons" element={<MockHackathons />} />
        <Route path="/workspace/:teamId" element={<WorkspaceLayout />}>
          <Route index element={<Workspace />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="resources" element={<Resources />} />
        </Route>
        <Route path="/workspace" element={<Navigate to="/workspace/1" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
