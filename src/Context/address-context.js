import { createContext, useContext, useReducer } from "react";

const AddressContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "address-line-1":
      return {
        ...state,
        address: { ...state.address, addressLine1: action.payload },
      };
    case "address-line-2":
      return {
        ...state,
        address: { ...state.address, addressLine2: action.payload },
      };
    case "address-line-3":
      return {
        ...state,
        address: { ...state.address, addressLine3: action.payload },
      };
    case "address-line-4":
      return {
        ...state,
        address: { ...state.address, addressLine4: action.payload },
      };
    case "address-line-5":
      return {
        ...state,
        address: { ...state.address, addressLine5: action.payload },
      };
    case "address-line-6":
      return {
        ...state,
        address: { ...state.address, addressLine6: action.payload },
      };
    case "address-line-7":
      return {
        ...state,
        address: { ...state.address, addressLine7: action.payload },
      };
    case "edit-address":
      return {
        ...state,
        address: {
          addressLine1: action.payload[0],
          addressLine2: action.payload[1],
          addressLine3: action.payload[2],
          addressLine4: action.payload[3],
          addressLine5: action.payload[4],
          addressLine6: action.payload[5],
          addressLine7: action.payload[6],
        },
      };
    case "reset-to-default":
      return {
        ...state,
        address: {
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          addressLine4: "",
          addressLine5: "",
          addressLine6: "",
          addressLine7: "",
        },
      };
    default:
      return state;
  }
};

const AddressProvider = ({ children }) => {
  var [state, dispatch] = useReducer(reducer, {
    address: {
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      addressLine4: "",
      addressLine5: "",
      addressLine6: "",
      addressLine7: "",
    },
  });
  return (
    <AddressContext.Provider value={{ state, dispatch }}>
      {children}
    </AddressContext.Provider>
  );
};

const useAddress = () => useContext(AddressContext);

export { AddressProvider, useAddress };
