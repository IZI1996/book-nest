import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

// الصفحات المشتركة
import Home from './components/pages/shared/Home';
import About from './components/pages/shared/About';

// صفحات المصادقة
import Login from './components/pages/auth/login';
import Register from './components/pages/auth/Rgister';

// صفحات البائع
import Library from './components/pages/seller/Libiray';
import BookAdder from './components/pages/seller/BookAdder';
import EditBook from './components/pages/seller/EditBook';

// صفحات المشتري
import Checklist from './components/pages/buyer/Checklist';
import CategoryBook from './components/pages/buyer/CategoryBook';
import BooksListt from'./components/pages/buyer/BooksListt'
import CartPage from './components/pages/buyer/Checklist';
import CartIcon from './components/pages/buyer/CartIcon';
function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* الصفحات المشتركة */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* صفحات المصادقة */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        {/* صفحات البائع */}
        <Route path="/seller/library" element={<Library />} />
        <Route path="/seller/add-book" element={<BookAdder />} />
        <Route path="/seller/edit-book/:id" element={<EditBook />} />
        
        {/* صفحات المشتري */}
        <Route path="/buyer/checklist" element={<Checklist />} />
        <Route path="/buyer/categories" element={<CategoryBook />} />
                <Route path="/buyer/List" element={<BooksListt />} />
                                <Route path="/cart" element={<CartPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;