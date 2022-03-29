import { createContext, useContext, useReducer } from "react";

const FilterContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "Setup":
      return {
        ...state,
        items: action.payload,
      };
    case "Categories setup":
      return {
        ...state,
        categories: action.payload,
      };
    case "Low to High":
      return {
        ...state,
        items: state.items.sort((a, b) => a.bookPrice - b.bookPrice),
      };
    case "High to Low":
      return {
        ...state,
        items: state.items.sort((a, b) => b.bookPrice - a.bookPrice),
      };
    case "Price filter":
      state.items.map((item) => {
        item.bookPrice > action.payload
          ? (item.show = false)
          : (item.show = true);

        return true;
      });
      return {
        ...state,
        items: state.items,
      };
    case "Rating filter":
      state.items.map((item) => {
        item.bookRating < action.payload
          ? (item.show = false)
          : (item.show = true);
        return true;
      });
      return {
        ...state,
        items: state.items,
      };
    case "Category filter":
      if (state.categoryFiltersFlag === false) {
        state.items.map((item) => {
          item.categoryName === action.payload.id
            ? (item.show = true)
            : (item.show = false);
          return true;
        });
        return {
          items: state.items,
          categoryFiltersFlag: true,
          checkedCount: state.checkedCount + 1,
        };
      } else {
        if (action.payload.checked) {
          state.items.map((item) => {
            if (item.categoryName === action.payload.id) {
              item.show = true;
            }
            return true;
          });
          return {
            items: state.items,
            categoryFiltersFlag: true,
            checkedCount: state.checkedCount + 1,
          };
        } else {
          if (state.checkedCount === 1) {
            state.items.map((item) => (item.show = true));
            return {
              items: state.items,
              categoryFiltersFlag: false,
              checkedCount: state.checkedCount - 1,
            };
          } else {
            state.items.map((item) => {
              if (item.categoryName === action.payload.id) item.show = false;
              return true;
            });
            return {
              items: state.items,
              categoryFiltersFlag: true,
              checkedCount: state.checkedCount - 1,
            };
          }
        }
      }
    case "Clear filter":
      state.items.map((item) => (item.show = true));
      return {
        items: state.items,
        categoryFiltersFlag: false,
        checkedCount: 0,
      };
    default:
      return state;
  }
};

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    categories: [],
    items: [],
    categoryFiltersFlag: false,
    checkedCount: 0,
  });
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
