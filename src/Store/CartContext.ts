import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Product interface - exported directly
export interface Product {
  product_name: string;
  category: string;
  discount: string;
  ratings: string;
  image: string;
  redirection: string;
  selling_price: string;
  orignal_price: string;
  fit: string;
}

// Filter state interface - exported directly
export interface FilterState {
  categories: string[];
  discounts: string[];
  ratings: string[];
  fits: string[];
}

// Cart state interface - exported directly
export interface CartState {
  products: Product[];
  filterData: Product[];
  cart: string[];
  selectedProduct: Product | null;
  filters: FilterState;
}

// Action types - exported directly
export type CartAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: string }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_FILTERS'; payload: { filters: FilterState } }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SHOW_PRODUCT'; payload: Product };

// Initial state
const initialState: CartState = {
  products: [],
  filterData: [],
  cart: [],
  selectedProduct: null,
  filters: {
    categories: [],
    discounts: [],
    ratings: [],
    fits: []
  }
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };

    case 'ADD_TO_CART':
      if (state.cart.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item !== action.payload)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'SET_FILTERS':
      const { filters } = action.payload;
      let filteredProducts = state.products;

      // Apply category filter
      if (filters.categories.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.categories.includes(product.category)
        );
      }

      // Apply discount filter
      if (filters.discounts.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.discounts.some(discount => product.discount.includes(discount))
        );
      }

      // Apply ratings filter
      if (filters.ratings.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.ratings.includes(product.ratings)
        );
      }

      // Apply fit filter
      if (filters.fits.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.fits.includes(product.fit)
        );
      }

      return {
        ...state,
        filterData: filteredProducts,
        filters
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filterData: [],
        filters: {
          categories: [],
          discounts: [],
          ratings: [],
          fits: []
        }
      };

    case 'SHOW_PRODUCT':
      return {
        ...state,
        selectedProduct: action.payload
      };

    default:
      return state;
  }
};

// Context interface
interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component props
interface CartProviderProps {
  children: ReactNode;
}

// Provider component
export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return React.createElement(
    CartContext.Provider,
    { value: { state, dispatch } },
    children
  );
}

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;