import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
  };
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-gray-700 hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-gray-900",
        className
      )}
      aria-label={`Ver projeto ${project.title}`}
    >
      <span className="sr-only">Ver projeto {project.title}</span>
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-gray-400 line-clamp-2">{project.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-800/50">
          <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
            Ver projeto
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
