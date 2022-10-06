import { createContext, useContext, useReducer } from "react";
import { products } from '../data/products'
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, {
    products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    productState: products,
  });

  console.log('cart context', state)
  console.log('productState context', productState)

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
