import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add-book' element={<AddBook />} />
      <Route path='/book/:id' element={<BookDetails />} />
    </Routes>
    </>
  );
}

export default App;