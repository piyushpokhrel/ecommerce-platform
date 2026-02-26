import { useEffect, useState } from 'react';
import { useDetailsPanelStore, useToastStore } from '../store';
import type { Project, ProjectStatus, ProjectPriority } from '../types';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { ProjectCardSkeleton } from '../components/Skeleton';
import { getGithubProjects } from "../services/projects.service";
import type { GithubRepo } from "../services/projects.service";


const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' }
];

const priorityOptions = [
  { value: '', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'progress', label: 'Progress' },
  { value: 'title', label: 'Title (A-Z)' }
];

function mapGithubToProjects(repos: GithubRepo[]): Project[] {
  return repos.map((r) => ({
    id: String(r.id),
    title: r.name,
    description: r.description ?? "No description provided.",
    status: "active",
    priority: "medium",
    tags: [
      ...(r.language ? [r.language] : []),
      ...(r.stars ? [`⭐ ${r.stars}`] : []),
      ...(r.forks ? [`🍴 ${r.forks}`] : []),
    ],
    progress: 100,
    startDate: new Date().toISOString(),
    teamSize: 1,
    image: undefined,
    url: r.url, // ✅ correct
  }));
}


export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const { addToast } = useToastStore();
  const { open } = useDetailsPanelStore();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
  setIsLoading(true);
  try {
    const repos = await getGithubProjects();
    const mapped = mapGithubToProjects(repos);
setProjects(mapped);
  }catch(error) {
    addToast({ type: "error", message: "Failed to load GitHub projects" });
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    filterAndSortProjects();
  }, [projects, searchQuery, statusFilter, priorityFilter, sortBy]);


    
  const filterAndSortProjects = () => {
    let filtered = [...projects];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    if (priorityFilter) {
      filtered = filtered.filter((p) => p.priority === priorityFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
    });

    setFilteredProjects(filtered);
  };

const handleProjectClick = (project: Project) => {
  open(project);
  addToast({
    type: 'info',
    message: 'Project details loaded',
    duration: 2000
  });
};

  return (

    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Projects
            <div className="text-xs text-gray-500">
  projects: {projects.length} | filtered: {filteredProjects.length} | loading: {String(isLoading)}
</div>

          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              aria-label="Search projects"
            />

            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            />

            <Select
              options={priorityOptions}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filter by priority"
            />

            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort projects"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search query
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
            >
              <ProjectCard
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({
  project,
  onClick
}: {
  project: Project;
  onClick: () => void;
}) => {
  const statusColors: Record<ProjectStatus, string> = {
    active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    completed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    archived: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
  };

  const priorityColors: Record<ProjectPriority, string> = {
    low: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
    high: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
  };

  return (
    <Card hoverable interactive onClick={onClick}>
      <CardContent className="p-6">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
            {project.url && (
  <a
    href={project.url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mb-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
    onClick={(e) => e.stopPropagation()}
  >
    View on GitHub →
  </a>
)}
        </CardHeader>



        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className={`px-2 py-1 font-medium rounded-full ${statusColors[project.status]}`}>
              {project.status}
            </span>
            <span className={`px-2 py-1 font-medium rounded-full ${priorityColors[project.priority]}`}>
              {project.priority}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {project.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
            <span>👥 {project.teamSize} members</span>
            <span>{new Date(project.startDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default Projects;
