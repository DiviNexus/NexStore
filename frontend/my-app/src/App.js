import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import UserOrders from "./pages/UserOrders";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/myorders" element={<UserOrders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
