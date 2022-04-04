import "./products.css";
import Card from "./../../Components/Card/Card";
import { useEffect, useRef, useState } from "react";
import { useProducts } from "./../../Context/products-context";
import { useToast } from "./../../Context/toast-context";
import { useFilter } from "./../../Context/filter-context";
import Navbar from "./../../Components/Navbar/Navbar";
import { useParams } from "react-router";

function Products(props) {
  const [price, setPrice] = useState("450");

  const [formInputs, setFormInputs] = useState({
    thrillerCheckbox: false,
    romanceCheckbox: false,
    scifiCheckbox: false,
    dramaCheckbox: false,
    rating4Checkbox: false,
    rating3Checkbox: false,
    rating2Checkbox: false,
    lowToHighRadio: false,
    highToLowRadio: false,
  });

  const [unsortedArray, setUnsortedArray] = useState([]);

  let { categoryName } = useParams();
  const inputRef = useRef(null);

  const { state, dispatch } = useFilter();

  const applyFilters = (passedType, passedPayload) => {
    dispatch({ type: "Manage filters", payload: passedPayload });
    dispatch({ type: "Setup", payload: unsortedArray });
    dispatch({ type: passedType });
  };

  const clearFilters = () => {
    dispatch({ type: "Manage filters", payload: "" });
    dispatch({ type: "Clear filter", payload: unsortedArray });
    setPrice("450");
    setFormInputs({
      thrillerCheckbox: false,
      romanceCheckbox: false,
      scifiCheckbox: false,
      dramaCheckbox: false,
      rating4Checkbox: false,
      rating3Checkbox: false,
      rating2Checkbox: false,
      lowToHighRadio: false,
      highToLowRadio: false,
    });
  };

  useEffect(() => {
    fetch("/api/products", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "Setup", payload: json.products });
        setUnsortedArray(json.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const { toggleToast, toastVisibility, toastColor, toastText } = useToast();

  const { cartArray, setCartArray, wishlistArray, setWishlistArray } =
    useProducts();

  const encodedToken = localStorage.getItem("ENCODED_TOKEN");

  const addToCart = (product) => {
    var productFlag = false;
    cartArray.map((cartItem, index) => {
      if (cartItem._id === product._id) {
        productFlag = true;
        toggleToast("Added To Cart ✔", "green", "whitesmoke");
        setCartArray([
          ...cartArray.slice(0, index),
          {
            ...cartArray[index],
            bookQuantity: cartItem.bookQuantity + 1,
          },
          ...cartArray.slice(index + 1),
        ]);
        fetch(`/api/user/cart/${product._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: encodedToken,
          },
          body: JSON.stringify({ action: { type: "increment" } }),
        });
      }
      return true;
    });
    if (productFlag === false) {
      setCartArray([...cartArray, product]);
      toggleToast("Added To Cart ✔", "green", "whitesmoke");
      fetch("/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
        body: JSON.stringify({ product }),
      });
    }
  };

  const addToWishlist = (product) => {
    var wishlistFlag = false;
    wishlistArray.map((wishlistItem) => {
      if (wishlistItem._id === product._id) {
        wishlistFlag = true;
        return true;
      }
      return true;
    });
    if (wishlistFlag === false) {
      toggleToast("Added To Wishlist ✔", "green", "whitesmoke");
      setWishlistArray([...wishlistArray, product]);
      fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
        body: JSON.stringify({ product }),
      });
    } else {
      toggleToast("Already in Wishlist ✔", "green", "whitesmoke");
    }
  };

  useEffect(() => {
    localStorage.setItem("CART_ARRAY", JSON.stringify(cartArray));
    localStorage.setItem("WISHLIST_ARRAY", JSON.stringify(wishlistArray));
  }, [cartArray, wishlistArray]);

  return (
    <div className="Products">
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
      <div className="landing-page-container">
        <div className="filter-section">
          <div className="filter-section-title">
            <h3> Filters </h3> <p onClick={clearFilters}> Clear </p>{" "}
          </div>{" "}
          <div className="price-filter">
            <h3 className="filter-header"> Price </h3>{" "}
            <input
              ref={inputRef}
              onChange={(event) => {
                setPrice(event.target.value);
                applyFilters("Price filter", event.target);
              }}
              value={price}
              type="range"
              min="150"
              max="450"
              step="100"
            />
            <p>
              <span> 150 </span> <span> 250 </span> <span> 350 </span>{" "}
              <span> 450 </span>{" "}
            </p>{" "}
          </div>{" "}
          {props.productPage && (
            <div className="category-filter input-filter">
              <h3 className="filter-header"> Category </h3>{" "}
              <div>
                <input
                  ref={inputRef}
                  id="Thriller"
                  className="category-checkbox"
                  type="checkbox"
                  onChange={(event) => {
                    setFormInputs({
                      ...formInputs,
                      thrillerCheckbox: !formInputs.thrillerCheckbox,
                    });
                    applyFilters("Category filter", event.target);
                  }}
                  checked={formInputs.thrillerCheckbox}
                />
                <label htmlFor="Thriller"> Thrillers </label>{" "}
              </div>{" "}
              <div>
                <input
                  ref={inputRef}
                  id="Drama"
                  className="category-checkbox"
                  type="checkbox"
                  onChange={(event) => {
                    setFormInputs({
                      ...formInputs,
                      dramaCheckbox: !formInputs.dramaCheckbox,
                    });
                    applyFilters("Category filter", event.target);
                  }}
                  checked={formInputs.dramaCheckbox}
                />{" "}
                <label htmlFor="Drama"> Drama </label>{" "}
              </div>{" "}
              <div>
                <input
                  ref={inputRef}
                  id="Scifi"
                  className="category-checkbox"
                  type="checkbox"
                  onChange={(event) => {
                    setFormInputs({
                      ...formInputs,
                      scifiCheckbox: !formInputs.scifiCheckbox,
                    });
                    applyFilters("Category filter", event.target);
                  }}
                  checked={formInputs.scifiCheckbox}
                />{" "}
                <label htmlFor="Scifi"> Sci - Fi </label>{" "}
              </div>{" "}
              <div>
                <input
                  ref={inputRef}
                  id="Romance"
                  className="category-checkbox"
                  type="checkbox"
                  onChange={(event) => {
                    setFormInputs({
                      ...formInputs,
                      romanceCheckbox: !formInputs.romanceCheckbox,
                    });
                    applyFilters("Category filter", event.target);
                  }}
                  checked={formInputs.romanceCheckbox}
                />{" "}
                <label htmlFor="Romance"> Romance </label>{" "}
              </div>{" "}
            </div>
          )}
          <div className="rating-filter input-filter">
            <h3 className="filter-header"> Rating </h3>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                value={4}
                id="rating-4-stars-and-above"
                name="rating-input"
                onClick={(event) => {
                  setFormInputs({
                    ...formInputs,
                    rating4Checkbox: true,
                    rating3Checkbox: false,
                    rating2Checkbox: false,
                  });
                  applyFilters("Rating filter", event.target);
                }}
                checked={formInputs.rating4Checkbox}
              />{" "}
              <label htmlFor="rating-4-stars-and-above">
                {" "}
                4 Stars & above{" "}
              </label>{" "}
            </div>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                value={3}
                id="rating-3-stars-and-above"
                name="rating-input"
                onClick={(event) => {
                  setFormInputs({
                    ...formInputs,
                    rating4Checkbox: false,
                    rating3Checkbox: true,
                    rating2Checkbox: false,
                  });
                  applyFilters("Rating filter", event.target);
                }}
                checked={formInputs.rating3Checkbox}
              />{" "}
              <label htmlFor="rating-3-stars-and-above">
                {" "}
                3 Stars & above{" "}
              </label>{" "}
            </div>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                value={2}
                id="rating-2-stars-and-above"
                name="rating-input"
                onClick={(event) => {
                  setFormInputs({
                    ...formInputs,
                    rating4Checkbox: false,
                    rating3Checkbox: false,
                    rating2Checkbox: true,
                  });
                  applyFilters("Rating filter", event.target);
                }}
                checked={formInputs.rating2Checkbox}
              />{" "}
              <label htmlFor="rating-2-stars-and-above">
                {" "}
                2 Stars & above{" "}
              </label>{" "}
            </div>{" "}
          </div>{" "}
          <div className="sort-filter input-filter">
            <h3 className="filter-header"> Sort by </h3>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                id="radio-5"
                name="sort-input"
                onClick={(event) => {
                  setFormInputs({
                    ...formInputs,
                    lowToHighRadio: true,
                    highToLowRadio: false,
                  });
                  applyFilters("Low to High", event.target);
                }}
                checked={formInputs.lowToHighRadio}
              />
              <label htmlFor="radio-5"> Low to High </label>{" "}
            </div>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                id="radio-6"
                name="sort-input"
                onClick={(event) => {
                  setFormInputs({
                    ...formInputs,
                    lowToHighRadio: false,
                    highToLowRadio: true,
                  });
                  applyFilters("High to Low", event.target);
                }}
                checked={formInputs.highToLowRadio}
              />
              <label htmlFor="radio-6"> High to Low </label>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="landing-page-content">
          {props.productPage &&
            state.items.map((product) => {
              return (
                <Card
                  key={product._id}
                  bookCover={product.bookCover}
                  bookTitle={product.bookTitle}
                  bookAuthor={product.bookAuthor}
                  bookPrice={product.bookPrice}
                  actionOne={product.actionOne}
                  actionTwo={product.actionTwo}
                  actionOneFunction={() => addToCart(product)}
                  actionTwoFunction={() => addToWishlist(product)}
                  bookQuantity={1}
                />
              );
            })}

          {state.items
            .filter((item) => item.categoryName === categoryName)
            .map((product) => {
              return (
                <Card
                  key={product._id}
                  bookCover={product.bookCover}
                  bookTitle={product.bookTitle}
                  bookAuthor={product.bookAuthor}
                  bookPrice={product.bookPrice}
                  actionOne={product.actionOne}
                  actionTwo={product.actionTwo}
                  actionOneFunction={() => addToCart(product)}
                  actionTwoFunction={() => addToWishlist(product)}
                  bookQuantity={1}
                />
              );
            })}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Products;
