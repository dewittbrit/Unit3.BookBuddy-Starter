import { useEffect, useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'

function App() {
  const [token, setToken] = useState(null)
  const [newReservedBook, setNewReservedBook] = useState(null)

  useEffect(()=>{
    let savedToken = localStorage.getItem("token")
    if(savedToken !="null"){
      setToken(savedToken)
    }

  }, [])

  function logOut(){
    localStorage.setItem("token", null)
    setToken(null)
  }
 
  return (
    <>

    <button onClick={logOut}>Log Out </button>
    <h2>Register</h2>
    <Register/>
    <h2>Login</h2>
    <Login setToken={setToken}/>
    <h2>See Reserved Books</h2>
    <Account token={token} newReservedBook={newReservedBook}/>
    <h2>See all books</h2>
    <Books token={token} setNewReservedBook={setNewReservedBook}/>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>

      <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

      <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

      <p>Don't forget to set up React Router to navigate between the different views of your single page application!</p>
    </>
  )
}

export default App

