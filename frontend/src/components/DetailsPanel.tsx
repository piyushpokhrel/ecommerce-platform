import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDetailsPanelStore } from '../store';
import { projectsApi } from "../utils/api";
import type { Project } from '../types';
import { Button } from './Button';
import { Skeleton } from './Skeleton';

export const DetailsPanel = () => {
  const { isOpen, selectedProject, close } = useDetailsPanelStore();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedProject && isOpen) {
      setIsLoading(true);
      projectsApi
        .getById(selectedProject.id)
        .then((res) => setProject(res.data))
        .finally(() => setIsLoading(false));
    } else {
      setProject(null);
    }
  }, [selectedProject, isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed lg:sticky top-16 right-0 h-[calc(100vh-4rem)] w-full sm:w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-40 overflow-y-auto"
            role="complementary"
            aria-label="Project details"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Project Details
                </h2>
                <button
                  onClick={close}
                  aria-label="Close details panel"
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton variant="rectangular" className="w-full h-48" />
                  <Skeleton className="w-3/4" />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-full" />
                </div>
              ) : project ? (
                <div className="space-y-6">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <DetailRow label="Status" value={project.status} />
                    <DetailRow label="Priority" value={project.priority} />
                    <DetailRow label="Progress" value={`${project.progress}%`} />
                    <DetailRow label="Team Size" value={project.teamSize.toString()} />
                    {project.budget && (
                      <DetailRow
                        label="Budget"
                        value={`$${project.budget.toLocaleString()}`}
                      />
                    )}
                    <DetailRow label="Start Date" value={project.startDate} />
                    {project.endDate && (
                      <DetailRow label="End Date" value={project.endDate} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button fullWidth>Edit Project</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    No project selected
                  </p>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </span>
    <span className="text-sm text-gray-900 dark:text-white capitalize">
      {value}
    </span>
  </div>
);