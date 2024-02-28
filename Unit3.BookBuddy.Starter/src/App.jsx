import { useEffect, useState } from 'react'
import {Link, Routes, Route} from 'react-router-dom'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'
import SingleBook from './SingleBook'
import BookSearch from './components/SearchBook'

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
    {
      token?<button onClick={logOut}>Log Out </button>
      :<Link to="/login"> Login</Link>
    }<br></br>
      <Link to="/">Home (See all books)</Link><br></br>
      {/* <Link to="/login">Login Page</Link><br></br> */}
      <Link to="/register">Register Account</Link><br></br>
      <Link to="/account">See Reserved Books</Link><br></br>
      <BookSearch/>
      <Routes>
        <Route path="/books/:bookID" element = {<SingleBook/>}/>
          <Route path="/login" element={<Login setToken={setToken}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/account" element={<Account token={token} newReservedBook={newReservedBook}/>} />
          <Route path="/" element={<Books token={token} setNewReservedBook={setNewReservedBook}/>}/>
      </Routes>
    </>
  )
}

export default App


