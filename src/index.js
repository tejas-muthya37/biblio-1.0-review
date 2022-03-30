import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductsProvider } from "./Context/products-context";
import { ToastProvider } from "./Context/toast-context";
import { FilterProvider } from "./Context/filter-context";
import { AddressProvider } from "./Context/address-context";
import { NavbarProvider } from "./Context/navbar-context";
import { makeServer } from "./server";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ProductsProvider>
      <ToastProvider>
        <FilterProvider>
          <AddressProvider>
            <NavbarProvider>
              <App />
            </NavbarProvider>
          </AddressProvider>
        </FilterProvider>
      </ToastProvider>
    </ProductsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
