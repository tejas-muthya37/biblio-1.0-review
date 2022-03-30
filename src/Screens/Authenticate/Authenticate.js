import "./authenticate.css";
import { useRef } from "react";
import Navbar from "./../../Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useNavbar } from "./../../Context/navbar-context";
import { useToast } from "./../../Context/toast-context";

function Authenticate(props) {
  const { toggleToast, toastVisibility, toastColor, toastText } = useToast();
  const { setNavbarButtonText } = useNavbar();
  const emailPattern = /\S+@\S+\.\S+/;
  let navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleAuth = () => {
    var payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (props.cardTitle === "LOGIN") {
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            localStorage.setItem("ENCODED_TOKEN", data.encodedToken);
            setNavbarButtonText("Logout");
            navigate("/books");
          } else {
            toggleToast(
              "Invalid credentials! Please try again.",
              "red",
              "whitesmoke"
            );
          }
        });
    } else if (props.cardTitle === "SIGN UP") {
      if (!emailPattern.test(payload.email)) {
        toggleToast(
          "Email Address is not valid! Please try again.",
          "red",
          "whitesmoke"
        );
      } else if (payload.password.length < 8) {
        toggleToast(
          "Password should be atleast 8 characters long!",
          "red",
          "whitesmoke"
        );
      } else {
        fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.errors) {
              emailRef.current.value = "";
              passwordRef.current.value = "";
              localStorage.setItem("ENCODED_TOKEN", data.encodedToken);
              setNavbarButtonText("Logout");
              navigate("/books");
            }
          });
      }
    }
  };
  return (
    <div className="Authenticate">
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
      <div className="landing-card">
        <h1>{props.cardTitle}</h1>
        <div className="landing-inputs">
          <div className="label-with-input">
            <label htmlFor="email">Email Address *</label>
            <input ref={emailRef} type="email" id="email" />
          </div>
          <div className="label-with-input">
            <label id="password-label" htmlFor="password">
              Password *
            </label>
            <input ref={passwordRef} type="password" id="password" />
          </div>
        </div>

        {/* Implementing this functionality later. */}

        {/* <div className="secondary-cta-section">
          <div className="secondary-cta-checkbox">
            <input id="checked-checkbox" type="checkbox" />
            <label htmlFor="checked-checkbox">{props.checkboxLabel}</label>
          </div>
          {props.cardTitle === "LOGIN" && (
            <div>
              <a href="/">Forgot your password?</a>
            </div>
          )}
        </div> */}
        <button onClick={handleAuth}>Next</button>
        <p className="alternate-cta">
          <Link to={props.cardTitle === "LOGIN" ? "/signup" : "/login"}>
            {props.alternate} <span>{">"}</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Authenticate;
