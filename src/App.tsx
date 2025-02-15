import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Home } from './pages/home';
import { Project } from './pages/project';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:projectId" element={<Project />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;