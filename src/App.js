
import './App.css';
import SignUp from './SignUp';
import Login from './Login';
import Blog from './Blog';
import ForgotPassword from './ForgotPassword';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/reset-password' element={<ForgotPassword/>}/>
      </Routes>
    </>
  )
}

export default App;
