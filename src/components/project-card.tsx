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
    <div className={cn(
      "group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-gray-700 hover:shadow-2xl hover:shadow-purple-500/10",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="aspect-video w-full overflow-hidden rounded-t-xl">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {project.title}
        </h3>
        <p className="mt-3 text-gray-400 line-clamp-2">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-gray-800/80 px-3 py-1 text-xs font-medium text-gray-300 border border-gray-700/50 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
        >
          Ver Projeto
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
