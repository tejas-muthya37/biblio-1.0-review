import { createContext, useContext, useReducer } from "react";

const FilterContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "Setup":
      console.log(action.payload);
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
        items: [...state.items].sort((a, b) => a.bookPrice - b.bookPrice),
      };
    case "High to Low":
      return {
        ...state,
        items: [...state.items].sort((a, b) => b.bookPrice - a.bookPrice),
      };
    case "Manage filters":
      if (action.payload.type === "checkbox") {
        if (action.payload.checked) {
          return {
            ...state,
            filters: {
              ...state.filters,
              category: [...state.filters.category, action.payload.id],
            },
          };
        } else {
          return {
            filters: {
              ...state.filters,
              category: state.filters.category.filter(
                (item) => item !== action.payload.id
              ),
            },
          };
        }
      } else if (action.payload.type === "radio") {
        return {
          ...state,
          filters: {
            ...state.filters,
            rating: Number(action.payload.value),
          },
        };
      } else if (action.payload.type === "range") {
        return {
          ...state,
          filters: {
            ...state.filters,
            price: Number(action.payload.value),
          },
        };
      }
      return state;
    case "Price filter":
      if (state.filters.category.length > 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              item.bookPrice < state.filters.price &&
              item.bookRating >= state.filters.rating &&
              state.filters.category.includes(item.categoryName)
          ),
        };
      } else {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              item.bookPrice < state.filters.price &&
              item.bookRating >= state.filters.rating
          ),
        };
      }
    case "Rating filter":
      if (state.filters.category.length > 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              item.bookPrice < state.filters.price &&
              item.bookRating >= state.filters.rating &&
              state.filters.category.includes(item.categoryName)
          ),
        };
      } else {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              item.bookPrice < state.filters.price &&
              item.bookRating >= state.filters.rating
          ),
        };
      }
    case "Category filter":
      if (state.filters.category.length > 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              item.bookPrice < state.filters.price &&
              item.bookRating >= state.filters.rating &&
              state.filters.category.includes(item.categoryName)
          ),
        };
      } else {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              item.bookPrice < state.filters.price &&
              item.bookRating >= state.filters.rating
          ),
        };
      }
    case "Clear filter":
      state.items.map((item) => (item.show = true));
      return {
        ...state,
        filters: {
          category: [],
          rating: 2,
          price: 450,
        },
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
    filters: {
      category: [],
      rating: 2,
      price: 450,
    },
  });
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
