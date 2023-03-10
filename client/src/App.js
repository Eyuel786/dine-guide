import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuthState } from "./hooks/useAuthState";

import AddRestaurant from "./pages/AddRestaurant";
import ProtectedRoute from "./components/ProtectedRoute";
import { fetchRestaurants } from "./store";
import RestaurantsList from "./pages/RestaurantsList";
import RestaurantDetail from "./pages/RestaurantDetail";
import EditRestaurant from "./pages/EditRestaurant";


function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  useAuthState(user);

  useEffect(() => {
    dispatch(fetchRestaurants())
      .catch(err => console.log("Error:", err.message));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<>Home</>} />
        <Route path="/restaurants" element={<RestaurantsList />} />
        <Route path="/restaurants/new" element={
          <ProtectedRoute>
            <AddRestaurant />
          </ProtectedRoute>} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/restaurants/:id/edit" element={
          <ProtectedRoute>
            <EditRestaurant />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={<>Contact us</>} />
        <Route path="/about" element={<>About us</>} />
        <Route path="*" element={<>Page not found</>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
