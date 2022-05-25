import "./categories.css";
import { Link } from "react-router-dom";
import Navbar from "./../../Components/Navbar/Navbar";
import { useEffect } from "react";
import { useFilter } from "./../../Context/filter-context";
import biblioCover from "./../../Media/biblio-cover.png";

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
      <div className="hero-section">
        <img className="home_image" alt="" src={biblioCover}></img>
        <div className="hero-section-cta">
          <h3>If you don't like to read, you haven't found the right book.</h3>
          <Link to="/books">
            <button>Shop Now</button>
          </Link>
        </div>
      </div>
      <div className="landing-page-content categories">
        {state.categories.map((category, index) => {
          return (
            <Link key={index} to={"/books/" + category.categoryName}>
              <div className="category-card">
                <p>{category.categoryName}</p>
                <img src={category.thumbnail} alt="" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
