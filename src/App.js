import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookAdder from './compenent/BookAdder.js'
import Libiray from './compenent/Libiray.js';
import EditBook from './compenent/EditBook.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './compenent/Home.js';
import Navbar from './compenent/Navbar.js';
import About from './compenent/About.js';
import Register from './conx/Rgister.js';
import Login from './conx/login.js';
import Store from './compenent/Store.js';
import CartPage from './compenent/Cartpage.js';





function App() {
  return (
    <div className="App">
     

<BrowserRouter>
<Navbar />  
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
             <Route path="/libiray" element={<Libiray />} />
              <Route path="/add" element={<BookAdder />} />
                <Route path="/edit/:id" element={<EditBook />} />
                <Route path="/reg" element={<Register />} />
                <Route path="/log" element={<Login />} />
                <Route path="/store" element={<Store />} />
                <Route path="/cart" element={<CartPage />} />





            </Routes>
            </BrowserRouter>



    </div>
  );
}

export default App;