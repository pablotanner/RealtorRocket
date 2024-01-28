import { create } from 'zustand';

export type User = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    currencyCode: string;
    title: string;
    location: string;
    phone: string;
    website: string;
    company: string;
    bio: string;
    activityStatus: string;
    role: string;
    avatarUrl: string;
};

export type GlobalState = {
    user?: User;

    signIn: (user: User) => void;
    signOut: () => void;
};

export const useGlobalStateStore = create<GlobalState>((set) => ({
    user: undefined,

    signIn: (user: User) => set((prevState) => ({ ...prevState, user })),
    signOut: () => set((prevState) => ({ ...prevState, user: undefined })),
}));