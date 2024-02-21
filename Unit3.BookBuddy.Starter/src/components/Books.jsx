/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useState, useEffect } from "react"

export default function Books({token, setNewReservedBook}){
    const [books, setBooks] = useState(null)

    useEffect(()=>{
        async function getBooks(){
        try{
          const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
          const result = await response.json()
          console.log(result)
          setBooks(result.books)
        } catch(err){
                console.error(err)
        }
            }    getBooks()
    }, [])

async function checkOut(id){
    try{
        const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/"+id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          available: false,
        })
      })
        const result = await response.json()
        console.log(result)
        setNewReservedBook(result)
      } catch(err){
              console.error(err)
      }

}

return (
<>
    {books && books.map(book=>{
        return <div key={book.id}><p key={book.id} >{book.title}</p>
        <button onClick={()=>checkOut(book.id)}>Reserve Book</button>
</div>
    })
    
    }
</>
)
}
