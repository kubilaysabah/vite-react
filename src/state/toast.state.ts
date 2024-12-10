import { create } from 'zustand'

type Status = 'success' | 'error' | 'info' | 'warning';

type MessageState = {
    message: string;
    show: boolean;
    duration: number;
    status: Status;
};

type State = {
    message: MessageState;
}

type Action = {
    showMessage: ({ message, status }: { message: string; status: Status; }) => void;
    closeMessage: () => void;
}

const initialState: MessageState = {
    message: '',
    show: false,
    duration: 3000,
    status: 'success'
}

export const useMessageStore = create<State & Action>((set) => ({
    message: initialState,
    showMessage: ({ message, status }) => {
        set((state) => ({
            message: {
                ...state.message,
                show: true,
                message,
                status,
            }
        }))
    },
    closeMessage: () => set({ message: initialState })
}))