// store/sidebar.ts
import { create } from "zustand";

export const useSidebarStore = create<{
  collapsed: boolean;
  toggle: () => void;
  set: (val: boolean) => void;
}>((set) => ({
  collapsed: false,
  toggle: () => set((s) => ({ collapsed: !s.collapsed })),
  set: (val) => set({ collapsed: val }),
}));
