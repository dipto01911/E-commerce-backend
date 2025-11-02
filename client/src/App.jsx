import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductByBrandPage from "./pages/ProductByBrandPage"
import ProductByCatPage from "./pages/ProductByCatPage"
import ProductByKeywordPage from "./pages/ProductByKeywordPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import LoginPages from "./pages/LoginPages"
import OtpPages from "./pages/OtpPages"
import ProfilePage from "./pages/ProfilePage"
import CartPage from './pages/CartPage';
import WishPages from "./pages/WishPages"
import OrderPage from "./pages/OrderPage"
import InvoicePage from "./pages/InvoicePage"


function App() {
  

  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/by-brand/:id" element={<ProductByBrandPage/>}/>
        <Route path="/by-category/:id" element={<ProductByCatPage/>}/>
        <Route path="/by-keyword/:Keyword" element={<ProductByKeywordPage/>}/>
        <Route path="/details/:id" element={<ProductDetailsPage/>}/>

        <Route path="/login" element={<LoginPages/>}/>
        <Route path="/otp" element={<OtpPages/>}/>
        <Route path="/profile" element={<ProfilePage/>}/> 
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/wish" element={<WishPages/>}/>
        <Route path="/orders" element={<OrderPage/>}/>
        <Route path="/invoice/:id" element={<InvoicePage/>}/>
      </Routes>
        
      
    </BrowserRouter>
  )
}

export default App
