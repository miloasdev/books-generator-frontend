// src/shared/stores/use-sidebar.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set) => ({
            isCollapsed: false,
            toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
        }),
        {
            name: 'sidebar-storage',
        }
    )
);
