import { create } from 'zustand';

interface NewSurfSessionStore {
    sessionName: string;
    setSessionName: (name: string) => void;
    comments: string;
    setComments: (name: string) => void;
}

export const useNewSurfSessionStore = create<NewSurfSessionStore>((set) => ({
    sessionName: '',
    setSessionName: (name: string) => set({ sessionName: name }),
    comments: '',
    setComments: (comments: string) => set({ comments }),
}));
