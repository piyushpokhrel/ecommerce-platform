import { create } from 'zustand';
import type { Toast } from '../types';

/**
 * Why Zustand?
 * - Minimal boilerplate compared to Redux Toolkit
 * - No provider wrapper needed (simpler than Context)
 * - Excellent TypeScript support
 * - Small bundle size (~1KB)
 * - Perfect for this app's simple state needs
 */

interface ToastStore {
toasts: Toast[];
addToast: (toast: Omit<Toast, 'id'>) => void;
removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
toasts: [],
addToast: (toast) => {
    const id = Math.random().toString(36).substring(7);
    const newToast = { ...toast, id };
    
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    if (toast.duration !== 0) {
    setTimeout(() => {
        set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
        }));
    }, toast.duration || 5000);
    }
},
removeToast: (id) =>
    set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
    }))
}));

interface DetailsPanelStore {
isOpen: boolean;
selectedProjectId: string | null;
toggle: () => void;
open: (projectId: string) => void;
close: () => void;
}

export const useDetailsPanelStore = create<DetailsPanelStore>((set) => ({
isOpen: false,
selectedProjectId: null,
toggle: () => set((state) => ({ isOpen: !state.isOpen })),
open: (projectId) => set({ isOpen: true, selectedProjectId: projectId }),
close: () => set({ isOpen: false, selectedProjectId: null })
}));