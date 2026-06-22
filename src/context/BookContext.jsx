import { createContext, useState, useEffect } from "react";
import { booksData } from "../data/mockData";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBooks(booksData);
      setLoading(false);
    }, 500);
  }, []);

  const toggleRead = (id) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, isRead: !book.isRead } : book
    );

    setBooks(updatedBooks);
  };

  const addBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: Date.now(),
      isRead: false,
    };

    setBooks((prev) => [...prev, bookWithId]);
  };

  const deleteBook = (id) => {
    const filtered = books.filter((book) => book.id !== id);
    setBooks(filtered);
  };

  return (
    <BookContext.Provider
      value={{ books, loading, toggleRead, addBook, deleteBook }}
    >
      {children}
    </BookContext.Provider>
  );
}