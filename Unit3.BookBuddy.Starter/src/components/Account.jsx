/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useState, useEffect } from "react"

export default function Account({token, setNewReservedBook}){
    const [reservedBooks, setReservedBooks] = useState(null)

    useEffect(()=>{
        async function getReservedBooks(){
        try{
          const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/",
          {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }})
        
          const result = await response.json()
          console.log(result)
          setReservedBooks(result.reservation)
        } catch(err){
                console.error(err)
        }
            }    getReservedBooks()
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
    {reservedBooks && reservedBooks.map(book=>{
        return <div key={book.id}><p key={book.id} >{book.title}</p>
        <button onClick={() => returnBook(book.id)}>Return</button>
</div>
    })
    
    }
</>
)
}
