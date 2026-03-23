import { createContext, useContext } from "react";

interface BookContextType {
  // Add shared state and actions here
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  return (
    <BookContext.Provider value={{}}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBookContext must be used within a BookProvider");
  return context;
}
