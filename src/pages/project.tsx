import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveCalculator } from '../projects/interactive-calculator';
import SkillSphereDashboard from '../projects/skill-sphere';
import VisuARDemoEnhanced from '../projects/visuar';
import CamIASecurityDashboard from '../projects/camIA';
import UXCustomBIDemo from '../projects/customBI';
import SupplyFitDemo from '../projects/supplyfit';
import RelationsManager from '../projects/relations';

const PROJECT_COMPONENTS: Record<string, React.FC> = {
  'interactive-calculator': InteractiveCalculator,
  'skill-sphere': SkillSphereDashboard,
  'visuar': VisuARDemoEnhanced,
  'camia': CamIASecurityDashboard,
  'customBI': UXCustomBIDemo,
  'supplyfit': SupplyFitDemo,
  'relations': RelationsManager,
};

export function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const ProjectComponent = projectId ? PROJECT_COMPONENTS[projectId] : null;

  const [ideaInput, setIdeaInput] = useState('');
  const [viewMode, setViewMode] = useState('preview');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleIdeaSubmit = async () => {
    const generatedCode = await simulateAICall(ideaInput);
    setGeneratedCode(generatedCode);
    setViewMode('code');
  };

  const simulateAICall = async (idea: string) => {
    return `// Código gerado para a ideia: ${idea}`;
  };

  return (
    <div className="container px-4 py-8 sm:px-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <div className="mt-8">
        <textarea
          value={ideaInput}
          onChange={(e) => setIdeaInput(e.target.value)}
          placeholder="Descreva sua ideia aqui..."
          className="w-full p-2 border rounded"
        />
        <button onClick={handleIdeaSubmit} className="mt-2 p-2 bg-blue-500 text-white rounded">
          Gerar Código
        </button>
      </div>

      <div className="mt-8">
        {viewMode === 'code' ? (
          <pre className="bg-gray-800 text-white p-4 rounded">
            {generatedCode}
          </pre>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <h2 className="text-xl font-bold mb-2">Preview do Projeto</h2>
            <p>O preview será exibido aqui.</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          {ProjectComponent ? (
            <ProjectComponent />
          ) : (
            <div className="text-center py-12 text-gray-400">
              <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
              <p>The requested project does not exist</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}