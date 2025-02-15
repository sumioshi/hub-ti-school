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
      "group relative overflow-hidden rounded-lg border border-[#1A1A1A] bg-[#0D0D0D] transition-all hover:border-[#262626]",
      className
    )}>
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-gray-400">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-[#1A1A1A] px-2.5 py-0.5 text-xs font-medium text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="mt-4 inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          View Project
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}