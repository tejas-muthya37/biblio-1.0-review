import "./categories.css";
import { Link } from "react-router-dom";
import Navbar from "./../../Components/Navbar/Navbar";
import { useEffect } from "react";
import { useFilter } from "./../../Context/filter-context";

function Categories() {
  const { state, dispatch } = useFilter();
  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "Categories setup", payload: data.categories })
      );
  }, []);

  return (
    <div className="Categories">
      <Navbar />
      <h1 className="landing-page-container-title">CATEGORIES</h1>
      <div className="landing-page-container categories">
        <div className="landing-page-content categories">
          {state.categories.map((category) => {
            return (
              <Link to={"/books/" + category.categoryName}>
                <div className="category-card">
                  <img src={category.thumbnail} alt="" />
                  <p>{category.categoryName}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="/books">
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Categories;
