import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveCalculator } from '../projects/interactive-calculator';
import SkillSphereDashboard from '../projects/skill-sphere';
import VisuARDemoEnhanced from '../projects/visuar';
import CamIASecurityDashboard from '../projects/camIA';
import UXCustomBIDemo from '../projects/customBI'; // Import do novo projeto

type ProjectComponents = Record<string, React.FC>;

const PROJECT_COMPONENTS: ProjectComponents = {
  'interactive-calculator': InteractiveCalculator,
  'skill-sphere': SkillSphereDashboard,
  'visuar': VisuARDemoEnhanced,
  'camia-security': CamIASecurityDashboard,
  'custom-bi': UXCustomBIDemo, // Mapeamento do UXCustomBI Pro
};

export function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  
  const ProjectComponent = projectId ? PROJECT_COMPONENTS[projectId] : null;

  return (
    <div className="container px-4 py-8 sm:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>
      
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
