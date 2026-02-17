import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsApi } from '../utils/api';
import type { DashboardStats, Project } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { DashboardCardSkeleton, ProjectCardSkeleton } from '../components/Skeleton';
import { useToastStore } from '../store';

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToastStore();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      const [statsRes, projectsRes] = await Promise.all([
        projectsApi.getDashboardStats(),
        projectsApi.getAll()
      ]);
      
      setStats(statsRes.data);
      setRecentProjects(projectsRes.data.slice(0, 3));
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Failed to load dashboard data'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = stats ? [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: '📊',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: '🚀',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Completed',
      value: stats.completedProjects,
      icon: '✅',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Total Budget',
      value: `$${(stats.totalBudget / 1000).toFixed(0)}K`,
      icon: '💰',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ] : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <DashboardCardSkeleton key={i} />)
          : statCards.map((stat) => (
              <div key={stat.title}>
                <Card hoverable>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <span className={`text-2xl ${stat.bgColor} p-2 rounded-lg`}>
                        {stat.icon}
                      </span>
                    </div>
                    <p className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Projects
          </h2>
          <Link to="/projects">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : recentProjects.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get started by creating your first project
              </p>
              <Button>Create Project</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const statusColors = {
    active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    completed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    archived: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
  };

  return (
    <Card hoverable>
      <CardContent className="p-6">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
        )}
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
            {project.status}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {project.progress}% complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
