import "./checkout.css";
import AddressForm from "./../../Components/AddressForm/AddressForm";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useProducts } from "./../../Context/products-context.js";
import Empty from "./../../Components/Empty/Empty";
import emptyImage from "./../../Media/empty-cart.png";
import { useToast } from "./../../Context/toast-context";
import { useAddress } from "./../../Context/address-context";
import Navbar from "./../../Components/Navbar/Navbar";

function Checkout() {
  const { cartArray } = useProducts();
  var storedSavedAddresses = JSON.parse(
    localStorage.getItem("SAVED_ADDRESSES")
  );

  if (storedSavedAddresses === null) storedSavedAddresses = [];

  const cartTotal = cartArray.reduce((accumulator, currentValue) => {
    accumulator += currentValue.bookPrice * currentValue.bookQuantity;
    return accumulator;
  }, 0);

  const cartQuantity = cartArray.reduce((accumulator, currentValue) => {
    accumulator += currentValue.bookQuantity;
    return accumulator;
  }, 0);

  var shippingTotal = 25 + cartQuantity * 25;

  if (storedSavedAddresses === undefined) storedSavedAddresses = [];

  const { state, dispatch } = useAddress();
  const { toggleToast, toastVisibility, toastColor, toastText } = useToast();

  const [savedAddresses, setSavedAddresses] = useState(storedSavedAddresses);
  const [formDisplay, setFormDisplay] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [editedAddressId, setEditedAddressId] = useState("");

  const [selectedAddress, setSelectedAddress] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [isAddressSelected, setIsAddressSelected] = useState(false);

  var cartString = "";

  cartArray.map((cartItem) => {
    cartString =
      cartString +
      `${cartItem.bookTitle} \t\t ${cartItem.bookQuantity} \t\t ${
        cartItem.bookPrice * cartItem.bookQuantity
      }\n\n`;
    return true;
  });

  const emailPattern = /\S+@\S+\.\S+/;

  const editAddress = (id) => {
    setEditingAddress(true);
    setFormDisplay(true);
    setEditedAddressId(id);
    savedAddresses.map((address) => {
      if (address.addressId === id) {
        const tempAddressArray = address.addressContent.split(", ");
        dispatch({ type: "edit-address", payload: tempAddressArray });
      }
      return true;
    });
  };

  const showForm = () => setFormDisplay(true);

  const updateAddressLine1 = (event) => {
    dispatch({ type: "address-line-1", payload: event.target.value });
  };

  const updateAddressLine2 = (event) => {
    dispatch({ type: "address-line-2", payload: event.target.value });
  };

  const updateAddressLine3 = (event) => {
    dispatch({ type: "address-line-3", payload: event.target.value });
  };

  const updateAddressLine4 = (event) => {
    dispatch({ type: "address-line-4", payload: event.target.value });
  };

  const updateAddressLine5 = (event) => {
    dispatch({ type: "address-line-5", payload: event.target.value });
  };

  const updateAddressLine6 = (event) => {
    dispatch({ type: "address-line-6", payload: event.target.value });
  };

  const updateAddressLine7 = (event) => {
    dispatch({ type: "address-line-7", payload: event.target.value });
  };

  const updateSavedAddresses = () => {
    if (
      state.address.addressLine1.length === 0 ||
      state.address.addressLine2.length === 0 ||
      state.address.addressLine3.length === 0 ||
      state.address.addressLine4.length === 0 ||
      state.address.addressLine5.length === 0 ||
      state.address.addressLine6.length === 0 ||
      state.address.addressLine7.length === 0
    ) {
      toggleToast("All the fields are required!", "red", "whitesmoke");
    } else if (!emailPattern.test(state.address.addressLine3)) {
      toggleToast("Invalid Email Address!", "red", "whitesmoke");
    } else if (state.address.addressLine2.length !== 10) {
      toggleToast("Invalid 10 Digit Mobile Number!", "red", "whitesmoke");
    } else if (state.address.addressLine4.length !== 6) {
      toggleToast("Invalid Pincode!", "red", "whitesmoke");
    } else if (state.address.addressLine5.length < 10) {
      toggleToast("Insufficient Address Details!", "red", "whitesmoke");
    } else {
      if (editingAddress === false) {
        setSavedAddresses([
          {
            addressId: uuid(),
            addressContent: `${state.address.addressLine1}, ${
              state.address.addressLine2
            }, ${state.address.addressLine3}, ${
              state.address.addressLine4
            }, ${state.address.addressLine5
              .replaceAll(", ", " ")
              .replaceAll(",", " ")}, ${state.address.addressLine6}, ${
              state.address.addressLine7
            }`,
          },
          ...savedAddresses,
        ]);
      } else {
        setSavedAddresses(
          [
            {
              addressId: uuid(),
              addressContent: `${state.address.addressLine1}, ${
                state.address.addressLine2
              }, ${state.address.addressLine3}, ${
                state.address.addressLine4
              }, ${state.address.addressLine5
                .replaceAll(", ", " ")
                .replaceAll(",", " ")}, ${state.address.addressLine6}, ${
                state.address.addressLine7
              }`,
            },
            ...savedAddresses,
          ].filter((address) => address.addressId !== editedAddressId)
        );
      }
      dispatch({ type: "reset-to-default" });
      setFormDisplay(false);
      localStorage.setItem("SAVED_ADDRESSES", JSON.stringify(savedAddresses));

      toggleToast("Address Saved ✔", "green", "whitesmoke");
    }
  };

  const removeAddress = (id) => {
    setSavedAddresses((savedAddresses) =>
      savedAddresses.filter((address) => address.addressId !== id)
    );

    toggleToast("Address Removed ✔", "red", "whitesmoke");
  };

  const cancelUpdateSavedAddresses = () => {
    dispatch({ type: "reset-to-default" });
    setFormDisplay(false);
  };

  const configureSelectedAddress = (id) => {
    setIsAddressSelected(true);
    savedAddresses.map((savedAddress) => {
      if (savedAddress.addressId === id) {
        const savedAddressArray = savedAddress.addressContent.split(", ");
        setSelectedAddress({
          name: savedAddressArray[0],
          mobile: savedAddressArray[1],
          email: savedAddressArray[2],
          address: `${savedAddressArray[4]} ${savedAddressArray[3]} ${savedAddressArray[5]} ${savedAddressArray[6]}`,
        });
      }
      return true;
    });
  };

  useEffect(() => {
    localStorage.setItem("SAVED_ADDRESSES", JSON.stringify(savedAddresses));
    console.log(selectedAddress);
  });

  return (
    <div className="Checkout">
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
      {cartArray.length > 0 && formDisplay && (
        <AddressForm
          updateAddressLine1={updateAddressLine1}
          updateAddressLine2={updateAddressLine2}
          updateAddressLine3={updateAddressLine3}
          updateAddressLine4={updateAddressLine4}
          updateAddressLine5={updateAddressLine5}
          updateAddressLine6={updateAddressLine6}
          updateAddressLine7={updateAddressLine7}
          updateSavedAddresses={updateSavedAddresses}
          cancelUpdateSavedAddresses={cancelUpdateSavedAddresses}
          input1Value={state.address.addressLine1}
          input2Value={state.address.addressLine2}
          input3Value={state.address.addressLine3}
          input4Value={state.address.addressLine4}
          input5Value={state.address.addressLine5}
          input6Value={state.address.addressLine6}
          input7Value={state.address.addressLine7}
        />
      )}
      {cartArray.length > 0 && formDisplay === false && (
        <div className="saved-addresses">
          <button className="btn-add-address" onClick={showForm}>
            <span>+</span>ADD A NEW ADDRESS
          </button>
          {savedAddresses?.length > 0 && (
            <h3 className="saved-address-title">Saved Addresses</h3>
          )}
          {savedAddresses?.map((singleAddress, index) => {
            return (
              <div className="saved-address" key={singleAddress.addressId}>
                <div className="select-address-input">
                  <p>{singleAddress.addressContent}</p>
                  <input
                    onClick={() =>
                      configureSelectedAddress(singleAddress.addressId)
                    }
                    name="address-select"
                    type="radio"
                  />
                </div>
                <div className="saved-address-button-group">
                  <button onClick={() => editAddress(singleAddress.addressId)}>
                    Edit
                  </button>
                  <button
                    onClick={() => removeAddress(singleAddress.addressId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          {savedAddresses?.length > 0 && (
            <form
              action="https://formsubmit.co/tejas.muthya37@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New order" />
              <input
                type="hidden"
                name="_next"
                value="https://biblio-books.netlify.app/success"
              />
              <input
                type="hidden"
                name="_autoresponse"
                value="Your order from Biblio"
              />
              <input type="hidden" name="Name" value={selectedAddress.name} />
              <input
                type="hidden"
                name="Mobile"
                value={selectedAddress.mobile}
              />
              <input
                style={{ display: "none" }}
                type="email"
                name="email"
                value={selectedAddress.email}
              />
              <input
                type="hidden"
                name="Address"
                value={selectedAddress.address}
              />
              <input type="hidden" name="Order Summary" value={cartString} />
              <input type="hidden" name="Cart Total" value={cartTotal} />
              <input
                type="hidden"
                name="Shipping Total"
                value={shippingTotal}
              />
              <input
                type="hidden"
                name="Grand Total"
                value={shippingTotal + cartTotal}
              />
              <button
                disabled={!isAddressSelected}
                style={{
                  cursor: isAddressSelected ? "pointer" : "not-allowed",
                }}
                type="submit"
                className="btn-confirm-order"
              >
                CONFIRM ORDER
              </button>
            </form>
          )}
        </div>
      )}
      {cartArray.length === 0 && (
        <Empty emptyImage={emptyImage} emptyTitle="cart" />
      )}
    </div>
  );
}

export default Checkout;
