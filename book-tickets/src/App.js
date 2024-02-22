import About from "./Pages/AboutPage";
import Contact from "./Pages/ContactPage";
import ErrorPage from "./Pages/ErrorPage";
import Homepage from "./Pages/Homepage";
import {  Route , Routes} from 'react-router-dom';
import MoviesPage from "./Pages/MoviesPage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProtectedRoute from "./route/ProtectedRoute";
import TheaterPage from "./Pages/TheaterPage";
import BookSeat from "./Pages/BookSeatPage";
import CheckOutPage from "./Pages/CheckOutPage";
function App() {
  return (
    <>
    
    <Routes>
    <Route path="/" element={<Homepage/>}/>
    
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/movies" element={<ProtectedRoute Component={MoviesPage}/>}/>
    <Route path="/theatre" element={<ProtectedRoute Component={TheaterPage}/>}/>
    <Route path="/bookseat" element={<ProtectedRoute Component={BookSeat}/>}/>
    <Route path="/checkout" element={<ProtectedRoute Component={CheckOutPage}/>}/>
    <Route path="/movies/:movieId" element={<ProtectedRoute Component={MovieDetailPage} />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    
   
    </>
  );
}

export default App;
