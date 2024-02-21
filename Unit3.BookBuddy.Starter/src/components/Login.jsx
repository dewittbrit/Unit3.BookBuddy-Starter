/* TODO - add your code to create a functional React component that renders a login form */

// /* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useState, useEffect } from "react"

export default function Login({setToken}){
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event){
        event.preventDefault()
        try{
                  const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
                    method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    
                    email: email,
                    password: password
                  })
                })
                  const result = await response.json()
                  console.log(result)
                  setToken(result.token)
                } catch(err){
                        console.error(err)
                }
    }
return (
<>
        <form onSubmit={handleSubmit}> 
            
            <label> Email:</label>
            <input value={email} onChange={(event)=>setEmail(event.target.value)}></input>
            <br></br>
            <label> Password:</label>
            <input value={password} onChange={(event)=>setPassword(event.target.value)}></input>
            <br></br>        
            <button>Submit</button>
        </form>
</>
)
}
