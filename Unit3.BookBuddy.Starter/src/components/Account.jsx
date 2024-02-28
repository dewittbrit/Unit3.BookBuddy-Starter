import React, { useState, useEffect } from "react";

export default function Account({ token, setNewReservedBook }) {
    const [reservedBooks, setReservedBooks] = useState(null);

    useEffect(() => {
        async function getReservedBooks() {
            try {
                const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const result = await response.json();
                setReservedBooks(result.reservation);
            } catch (err) {
                console.error(err);
            }
        }
        getReservedBooks();
    }, [token, setNewReservedBook]);

    async function returnBook(bookId) {
        try {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Book returned successfully, update reservedBooks state
                setReservedBooks(reservedBooks.filter(book => book.id !== bookId));
                // You might want to trigger additional actions, like updating UI or state elsewhere
            } else {
                console.error("Failed to return book");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {reservedBooks && reservedBooks.length > 0 ? (
                reservedBooks.map(book => (
                    <div key={book.id}>
                        <p>{book.title}</p>
                        <button onClick={() => returnBook(book.id)}>Return</button>
                    </div>
                ))
            ) : (
                <p>No books checked out</p>
            )}
        </>
    );
}