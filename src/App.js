import "./App.css";
import Authenticate from "./Screens/Authenticate/Authenticate";
import Cart from "./Screens/Cart/Cart";
import Wishlist from "./Screens/Wishlist/Wishlist";
import Products from "./Screens/Products/Products";
import Categories from "./Screens/Categories/Categories";
import Checkout from "./Screens/Checkout/Checkout";
import Success from "./Screens/Success/Success";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/mock" element={<Mockman />} />

          <Route path="/" element={<Categories />} />

          <Route
            path="/login"
            element={
              <Authenticate
                cardTitle="LOGIN"
                checkboxLabel="Remember me"
                alternate="Create a new account"
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Authenticate
                cardTitle="SIGN UP"
                checkboxLabel="I agree to the terms & conditions"
                alternate="Login with existing account"
              />
            }
          />

          <Route path="/books" element={<Products productPage={true} />} />

          <Route path="/books/:categoryName" element={<Products />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
