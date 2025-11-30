import {create} from 'zustand';

interface Note{
    id: number;
    name: string;
    lastEdited: string;
    contents: string;
    isOpen: boolean;
}

interface NoteState {
    notes: Note[];
    addNote: (note: Note) => void;
    updateNote: (id: number, updatedFields: Partial<Note>) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
    notes: [],
    addNote: (note: Note) => {
        set((state) => ({
            notes: [...state.notes, note],
        }));
    },

    updateNote: (id: number, updatedFields: Partial<Note>) => {
        set((state) => ({
            notes: state.notes.map((note) =>
                note.id === id ? { ...note, ...updatedFields } : note
            ),
        }));
    },
}));