import './App.css';
import ShowProduct from './Components/product/ShowProduct';
import ProductDetail from './Components/product/ProductDetail'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar';
import SearchProduct from './Components/product/SearchProduct';
import Register from './Components/user/Register';
import { ToastContainer, toast } from 'react-toastify';
import Login from './Components/user/Login';
import Profile from './Components/user/Profile';
import Cart from './Cart';
import Address from './Address';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';




function App() {
  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <ToastContainer/>
   <Routes>
    <Route path='/' element={<ShowProduct/>}></Route>
    <Route path='/product/:id' element={<ProductDetail/>}></Route>
    <Route path='/product/search/:term' element={<SearchProduct/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/cart' element={<Cart/>}></Route>
    <Route path='/shipping' element={<Address/>}></Route>
    <Route path='/checkout' element={<Checkout/>}></Route>
    <Route path='/orderConfirmation' element={<OrderConfirmation/>}></Route>


   </Routes>
   </BrowserRouter>
  
   </>
  );
}

export default App;
