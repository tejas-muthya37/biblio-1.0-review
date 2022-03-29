import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [navbarButtonText, setNavbarButtonText] = useState("Login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        navbarButtonText,
        setNavbarButtonText,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

const useNavbar = () => useContext(NavbarContext);

export { NavbarProvider, useNavbar };
