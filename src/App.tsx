import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Project } from './pages/project';
import { IdeaHub } from './pages/IdeaHub';
import SuppliFitApp from './projects/supplyfit';
import CamIASecurityDashboard from './projects/camIA';
import VisuARDemoEnhanced from './projects/visuar';
import UXCustomBIDemo from './projects/customBI';
import SkillSphereDashboard from './projects/skill-sphere';
import { InteractiveCalculator } from './projects/interactive-calculator';
import RelationshipManagerApp from './projects/relations';

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<Project />} />
        <Route path="/hub" element={<IdeaHub />} />
        <Route path="/projects/supplyfit" element={<SuppliFitApp />} />
        <Route path="/projects/camia" element={<CamIASecurityDashboard />} />
        <Route path="/projects/visuar" element={<VisuARDemoEnhanced />} />
        <Route path="/projects/customBI" element={<UXCustomBIDemo />} />
        <Route path="/projects/skill-sphere" element={<SkillSphereDashboard />} />
        <Route path="/projects/interactive-calculator" element={<InteractiveCalculator />} />
        <Route path="/projects/relations" element={<RelationshipManagerApp />} />
      </Routes>
    </Router>
  );
}