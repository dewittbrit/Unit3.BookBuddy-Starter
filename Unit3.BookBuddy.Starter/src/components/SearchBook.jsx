import React, { useState, useEffect } from "react";

function BookSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    async function searchBooks() {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books?q=${searchTerm}`, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        // Filter the books based on the search term
        const filteredBooks = data.books.filter(book =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredBooks);
      } catch (error) {
        console.error("Error searching books:", error);
      } finally {
        setLoading(false);
      }
    }

    searchBooks();
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleChange}
      />
      {loading && <p>Loading...</p>}
      {!loading && searchResults.length === 0 && <p>No results found</p>}
      {!loading && searchResults.length > 0 && (
        <ul>
          {searchResults.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookSearch;