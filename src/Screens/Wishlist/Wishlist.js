import "./wishlist.css";
import Card from "./../../Components/Card/Card";
import { useEffect } from "react";
import { useProducts } from "./../../Context/products-context";
import Empty from "./../../Components/Empty/Empty";
import emptyImage from "./../../Media/empty-cart.png";
import { useToast } from "./../../Context/toast-context";
import Navbar from "./../../Components/Navbar/Navbar";

function Wishlist() {
  const encodedToken = localStorage.getItem("ENCODED_TOKEN");
  const { toggleToast, toastVisibility, toastColor, toastText } = useToast();

  const { cartArray, setCartArray, wishlistArray, setWishlistArray } =
    useProducts();

  const moveToCart = (product) => {
    var productFlag = false;
    cartArray.map((cartItem, index) => {
      if (cartItem._id === product._id) {
        productFlag = true;
        setCartArray([
          ...cartArray.slice(0, index),
          { ...cartArray[index], bookQuantity: cartItem.bookQuantity + 1 },
          ...cartArray.slice(index + 1),
        ]);
      }
      return true;
    });
    if (productFlag === false) setCartArray([...cartArray, product]);
    toggleToast("Moved To Cart ✔", "green", "whitesmoke");
    setWishlistArray(
      wishlistArray.filter((wishlistItem) => wishlistItem._id !== product._id)
    );

    fetch(`/api/user/wishlist/${product._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: encodedToken,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        fetch("/api/user/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: encodedToken,
          },
          body: JSON.stringify({ product }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      });
  };

  const removeFromWishlist = (id) => {
    setWishlistArray(
      wishlistArray.filter((wishlistItem) => wishlistItem._id !== id)
    );
    toggleToast("Removed From Wishlist ✔", "red", "whitesmoke");

    fetch(`/api/user/wishlist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: encodedToken,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    localStorage.setItem("CART_ARRAY", JSON.stringify(cartArray));
    localStorage.setItem("WISHLIST_ARRAY", JSON.stringify(wishlistArray));
  }, [cartArray, wishlistArray]);

  return (
    <div className="Wishlist">
      <Navbar />
      <p
        style={{
          visibility: toastVisibility,
          backgroundColor: toastColor.backgroundColor,
          color: toastColor.color,
        }}
        className="message-toast"
      >
        {toastText}
      </p>
      {wishlistArray.length > 0 && (
        <h1 className="wishlist-title">MY WISHLIST</h1>
      )}
      {wishlistArray.length > 0 && (
        <div className="landing-page-container wishlist">
          {wishlistArray.map((product, index) => {
            return (
              <Card
                key={index}
                bookCover={product.bookCover}
                bookTitle={product.bookTitle}
                bookAuthor={product.bookAuthor}
                bookPrice={product.bookPrice}
                actionOne="Move To Cart"
                actionTwo="Remove From Wishlist"
                actionOneFunction={() => moveToCart(product)}
                actionTwoFunction={() => {
                  removeFromWishlist(product._id);
                }}
              />
            );
          })}
        </div>
      )}
      {wishlistArray.length === 0 && (
        <Empty emptyImage={emptyImage} emptyTitle="wishlist" />
      )}
    </div>
  );
}

export default Wishlist;
