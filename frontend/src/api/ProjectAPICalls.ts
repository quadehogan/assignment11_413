import type { Book } from "../types/Book";

interface FetchBooksResponse {
  totalBooks: number;
  allBooks: Book[];
}

interface FetchCategoriesResponse {
  categories: string[];
}

const API_BASE_URL = "https://libraryapp-axeebec3czcudeba.westus2-01.azurewebsites.net/api/Books";

export const fetchBooks = async (
    pageSize: number,
    currentPage: number,
    sortOrder: string,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {

    try {

      const categoryParams = selectedCategories.map((cat) => `categories=${encodeURIComponent(cat)}`).join("&"); 
      
      const response = await fetch(`${API_BASE_URL}/AllBooks?pageNumber=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}&${selectedCategories.length ? `${categoryParams}&` : ''}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

export const fetchCategories = async(): Promise<FetchCategoriesResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/Categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_BASE_URL}/AddBook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};

export const updateBook = async (bookId: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_BASE_URL}/UpdateBook/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};

export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/DeleteBook/${bookId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};