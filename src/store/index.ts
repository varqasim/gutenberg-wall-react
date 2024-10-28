import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  authToken: string;
}

interface UserStoreState {
  user?: User;
  setUser(user: User | undefined): void;
}

interface Book {
  id: string;
  title: string;
  author: string;
  publishedOn: string;
  summary?: string;
}

interface BookStoreState {
  book?: Book;
  setBook(book: Book | undefined): void;
}

export const useUserStore = create<UserStoreState>()((set) => ({
  user: undefined,
  setUser: (user: User | undefined) => set(() => ({ user: user })),
}));

export const useBookStore = create<BookStoreState>()((set) => ({
  book: undefined,
  setBook: (book) => set(() => ({ book: book }))
}));