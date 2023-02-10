import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<>Home</>} />
        <Route path='/restaurants' element={<>Restaurants</>} />
        <Route path='/restaurants/new' element={<>Add Restaurant</>} />
        <Route path='/contact' element={<>Contact us</>} />
        <Route path='/about' element={<>About us</>} />
        <Route path='/signin' element={<>Sign in</>} />
        <Route path='*' element={<>Page not found</>} />
      </Routes>
    </>
  );
}

export default App;
