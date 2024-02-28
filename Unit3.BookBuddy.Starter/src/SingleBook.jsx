/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. *//* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function SingleBook(){
   
let {bookID} = useParams()
let {bookTitle} = useParams()
let {bookAuthor} = useParams()
let {bookDescription} = useParams()

    

return (
<>
   <p>Book ID is {bookID}</p>
   <p>Book Title: {bookTitle}</p>
   <p>Author: {bookAuthor}</p>
   <p>Description: <br></br> {bookDescription}</p>
</>
    )


}
    
  