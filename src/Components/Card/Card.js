import "./card.css";
import { useNavbar } from "./../../Context/navbar-context";
import { useNavigate } from "react-router-dom";

function Card(props) {
  let navigate = useNavigate();

  const { isAuthenticated } = useNavbar();

  return (
    <div className="Card">
      <div className="card-e-commerce">
        <img className="item-image" src={props.bookCover} alt="book-cover" />
        <div className="item-content">
          <p className="item-title">
            {props.bookTitle}
            <span className="item-author">
              <br />
              by {props.bookAuthor}
            </span>
          </p>

          <div className="price-with-quantity">
            <p className="item-price-string">
              ₹ <span className="item-price">{props.bookPrice}</span>
            </p>
            {props.cartPage && (
              <div className="quantity-group">
                <button
                  onClick={props.decrementCartItemQuantity}
                  className="btn-decrement"
                >
                  -
                </button>
                <span className="quantity-value">{props.bookQuantity}</span>
                <button
                  onClick={props.incrementCartItemQuantity}
                  className="btn-increment"
                >
                  +
                </button>
              </div>
            )}
          </div>
          <div className="button-group">
            <button
              onClick={() => {
                isAuthenticated
                  ? props.actionOneFunction()
                  : navigate("/login");
              }}
              className="btn-action-one"
            >
              {props.actionOne}
            </button>
            <button
              onClick={() => {
                isAuthenticated
                  ? props.actionTwoFunction()
                  : navigate("/login");
              }}
              className="btn-action-two"
            >
              {props.actionTwo}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
