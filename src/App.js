import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// الصفحات المشتركة


// صفحات المصادقة
import Login from './components/pages/auth/login';
import Register from './components/pages/auth/Rgister';

// صفحات البائع
import Library from './components/pages/seller/store';
import BookAdder from './components/pages/seller/BookAdder';
import EditBook from './components/pages/seller/EditBook';

// صفحات المشتري
import Checklist from './components/pages/buyer/Checklist';
import CategoryBook from './components/pages/buyer/CategoryBook';
import BooksListt from './components/pages/buyer/BooksListt';
import FavoritePage from './components/pages/buyer/wishList';
import Bayer from './components/panles/panleBayer';
import Saller from './components/panles/panlesaller';
import BookDetail from './components/pages/buyer/bookDetails';
import MainPage from './main';
import BlogForm from './components/pages/seller/blogForm';
import BlogsList from './components/pages/buyer/BlogsList';
import Bloger from './components/pages/buyer/bloger';

function App() {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/" element={
    <MainPage />
} />
        {/* صفحات المصادقة */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        {/* صفحات البائع */}

        
         <Route path="/seller" element={<Saller />}>
      <Route index element={<Library />} /> {/* الصفحة الافتراضية */}
        <Route path="/seller/store" element={<Library />} />
   <Route path="/seller/blog" element={<BlogForm />} />

        <Route path="/seller/add-book" element={<BookAdder />} />
        <Route path="/seller/edit-book/:id" element={<EditBook />} />
        </Route>

        {/* صفحات المشتري مع Bayer Layout */}
        <Route path="/buyer" element={<Bayer />}>
                <Route path="/buyer/blog/:id" element={<Bloger />} />

          <Route index element={<Checklist />} /> {/* الصفحة الافتراضية */}
          <Route path="checklist" element={<Checklist />} />
          <Route path="categories" element={<CategoryBook />} />
          <Route path="List" element={<BooksListt />} />
          <Route path="ListBlogs" element={<BlogsList />} />

          <Route path="fav" element={<FavoritePage />} />

        </Route>
                <Route path="/blog/:id" element={<Bloger />} />

        <Route path="/book/:id" element={<BookDetail />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;