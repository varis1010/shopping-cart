export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":

      return {
        ...state,
        cart: state.cart.filter((cartItem) =>
          cartItem.id === action.payload.id ? (cartItem.qty = action.payload.qty) : cartItem.qty
        ),
      };

    case "CLEAR_CART_ITEMS":
      return {
        ...state,
        cart: []
      };
    default:
      return state;
  }
};


export const productReducer = (state, action) => {
  switch (action.type) {
    case "MINUS_CART_QTY": {
      const updatedProduct = state.productState.map((product) => {
        if (product.id === action.payload.id) {
          product.availableStock = action.payload.inStock - 1;
          return product;
        } else {
          return product
        }

      });
      // console.log('updatedProduct in put qty', updatedProduct)
      return {
        ...state,
        products: updatedProduct,
      };
    };
    case "ADD_BACK_QTY_TO_CART": {
      const updatedProduct = state.productState.map((product) => {

        if (product.id === action.payload.id) {
          // console.log(' product.availableStock', product.availableStock)
          // console.log(' action.payload.availableStock ADD_BACK_QTY_TO_CART', action.payload)
          product.availableStock = action.payload.inStock;
        }
        return product
      });
      // console.log('updatedProduct in add back', updatedProduct)
      // console.log('updatedProduct in add back payload', action.payload)
      return {
        ...state,
        products: updatedProduct,
      };
    };
    case "SUCCESS_CART_ITEM_DISPATCH":
      const updatedProduct = state?.products?.map((product, index) => {
        if (product?.id === action?.payload?.cart[index]?.id) {
          product.availableStock = (product.availableStock - (action.payload?.cart[index]?.qty - 1))
          return product;
        } else {
          return product;
        }

      })
      // console.log('updatedProduct in success------------', updatedProduct)
      return {
        ...state,
        products: updatedProduct
      };
    default:
      return state;
  }
};