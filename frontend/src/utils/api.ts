import type { Project, DashboardStats, ApiResponse } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    description: 'Complete UI/UX overhaul of the main shopping experience with focus on conversion optimization and mobile-first design.',
    status: 'active',
    priority: 'high',
    tags: ['React', 'TypeScript', 'Design System'],
    progress: 65,
    startDate: '2024-01-15',
    teamSize: 5,
    budget: 125000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Analytics Dashboard v2',
    description: 'Real-time analytics dashboard with advanced data visualization, custom reports, and predictive insights.',
    status: 'active',
    priority: 'high',
    tags: ['React', 'D3.js', 'WebSocket'],
    progress: 42,
    startDate: '2024-02-01',
    teamSize: 3,
    budget: 80000,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile application for iOS and Android with offline-first architecture and seamless sync.',
    status: 'active',
    priority: 'medium',
    tags: ['React Native', 'Mobile', 'API'],
    progress: 28,
    startDate: '2024-02-15',
    teamSize: 4,
    budget: 95000,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Design System Documentation',
    description: 'Comprehensive design system with component library, usage guidelines, and interactive playground.',
    status: 'completed',
    priority: 'medium',
    tags: ['Design System', 'Storybook', 'Documentation'],
    progress: 100,
    startDate: '2023-11-01',
    endDate: '2024-01-30',
    teamSize: 2,
    budget: 45000,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'API Integration Layer',
    description: 'Unified API gateway with authentication, rate limiting, caching, and comprehensive error handling.',
    status: 'completed',
    priority: 'high',
    tags: ['Node.js', 'API', 'Architecture'],
    progress: 100,
    startDate: '2023-10-15',
    endDate: '2024-01-10',
    teamSize: 3,
    budget: 70000,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'Performance Optimization',
    description: 'Site-wide performance improvements targeting Core Web Vitals, bundle size reduction, and load time optimization.',
    status: 'archived',
    priority: 'low',
    tags: ['Performance', 'Optimization', 'Web Vitals'],
    progress: 100,
    startDate: '2023-09-01',
    endDate: '2023-11-30',
    teamSize: 2,
    budget: 30000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
  },
  {
    id: '7',
    title: 'Authentication System Upgrade',
    description: 'Migration to modern auth solution with SSO, MFA, and enhanced security features.',
    status: 'active',
    priority: 'high',
    tags: ['Security', 'Auth', 'Infrastructure'],
    progress: 78,
    startDate: '2024-01-20',
    teamSize: 4,
    budget: 110000,
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=400&h=300&fit=crop'
  },
  {
    id: '8',
    title: 'Internationalization',
    description: 'Multi-language support with localization for 15+ languages and RTL layout compatibility.',
    status: 'active',
    priority: 'medium',
    tags: ['i18n', 'Localization', 'Global'],
    progress: 35,
    startDate: '2024-02-10',
    teamSize: 3,
    budget: 55000,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop'
  }
];

export const projectsApi = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    await delay(800);
    return { data: MOCK_PROJECTS };
  },

  getById: async (id: string): Promise<ApiResponse<Project>> => {
    await delay(500);
    const project = MOCK_PROJECTS.find(p => p.id === id);
    if (!project) throw new Error('Project not found');
    return { data: project };
  },

  search: async (query: string): Promise<ApiResponse<Project[]>> => {
    await delay(600);
    const filtered = MOCK_PROJECTS.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    return { data: filtered };
  },

  filter: async (
    status?: string,
    priority?: string,
    tags?: string[]
  ): Promise<ApiResponse<Project[]>> => {
    await delay(500);
    let filtered = [...MOCK_PROJECTS];

    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }
    if (priority) {
      filtered = filtered.filter(p => p.priority === priority);
    }
    if (tags && tags.length > 0) {
      filtered = filtered.filter(p => 
        tags.some(tag => p.tags.includes(tag))
      );
    }

    return { data: filtered };
  },

  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay(600);
    const stats: DashboardStats = {
      totalProjects: MOCK_PROJECTS.length,
      activeProjects: MOCK_PROJECTS.filter(p => p.status === 'active').length,
      completedProjects: MOCK_PROJECTS.filter(p => p.status === 'completed').length,
      totalBudget: MOCK_PROJECTS.reduce((sum, p) => sum + (p.budget || 0), 0)
    };
    return { data: stats };
  }
};