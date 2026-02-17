export type ProjectStatus = 'active' | 'completed' | 'archived';
export type ProjectPriority = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  tags: string[];
  progress: number;
  startDate: string;
  endDate?: string;
  teamSize: number;
  budget?: number;
  image?: string;
  url?: string;

}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalBudget: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface FilterOptions {
  status?: ProjectStatus;
  priority?: ProjectPriority;
  tags?: string[];
}

export interface SortOption {
  field: keyof Project;
  direction: 'asc' | 'desc';
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}