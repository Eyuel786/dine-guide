import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuthState } from "./hooks/useAuthState";


function App() {
  const user = useSelector(state => state.auth.user);
  useAuthState(user);

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
        <Route path='*' element={<>Page not found</>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
