import { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  var storedCartArray = JSON.parse(localStorage.getItem("CART_ARRAY"));
  if (storedCartArray === null) storedCartArray = [];

  const [cartArray, setCartArray] = useState(storedCartArray);

  var storedWishlistArray = JSON.parse(localStorage.getItem("WISHLIST_ARRAY"));
  if (storedWishlistArray === null) storedWishlistArray = [];

  const [wishlistArray, setWishlistArray] = useState(storedWishlistArray);
  return (
    <ProductsContext.Provider
      value={{
        cartArray,
        setCartArray,
        wishlistArray,
        setWishlistArray,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => useContext(ProductsContext);

export { ProductsProvider, useProducts };
