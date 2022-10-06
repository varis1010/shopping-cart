import { useEffect, useRef, useState } from "react";
import { Card, Button, InputGroup, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CartState } from "../context/Context";

const SingleProduct = ({ prod, selectComparedProducts, setSelectComparedProducts }) => {
  const {
    state: { cart },
    dispatch,
    productDispatch
  } = CartState();

  const handleAddCartDispatch = (e, prod) => {
    e.stopPropagation();
    productDispatch({
      type: "MINUS_CART_QTY",
      payload: prod,
    });
    dispatch({
      type: "ADD_TO_CART",
      payload: prod,
    });
  }

  const handleRemoveCartDispatch = (e, prod) => {
    e.stopPropagation();
    productDispatch({
      type: "ADD_BACK_QTY_TO_CART",
      payload: prod,
    });
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: prod,
    });
  };

  const notify = () => {
    toast.error(`Limit Exceeded!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handleCardSelect = (prod) => {
    const selectedIndex = selectComparedProducts.indexOf(prod);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectComparedProducts, prod);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectComparedProducts.slice(1));
    } else if (selectedIndex === selectComparedProducts.length - 1) {
      newSelected = newSelected.concat(selectComparedProducts.slice(0, -1));
    }
    else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectComparedProducts.slice(0, selectedIndex),
        selectComparedProducts.slice(selectedIndex + 1),
      );
    }
    if (newSelected.length > 3) {
      notify()
    }
    setSelectComparedProducts(newSelected.slice(0, 3));
  };

  const isSelected = (prod) => selectComparedProducts.indexOf(prod) !== -1;
  const isItemSelected = isSelected(prod);

  // const handleStockCount = () => {
  //   if (cart.length > 0) {
  //     return cart?.map((c) => {
  //       if (c.id === prod.id) {
  //         console.log('c ------------------------', c)
  //         return c.availableStock
  //       } else {
  //         return prod.inStock
  //       }
  //     })
  //   } else {
  //     return prod.inStock;
  //   }
  // }


  return (
    <>
      <div className="products">
        <Card className="products-card-container" onClick={() => handleCardSelect(prod)}>
          <span className="checkbox-gridview">
            <Form.Check
              inline
              checked={isItemSelected}
              name="group1"
              type="checkbox"
              id={`inline-checkbox-1`}
            />
          </span>

          <Card.Img
            variant="top"
            src={`${prod.image}.jpg`}
            alt={prod.name}
            width="200"
            height="300"
          />
          <Card.Body>
            <Card.Title>{prod.name}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span>₹ {prod.price.split(".")[0]}</span>
              <div>
                <span style={{ color: "red" }}>In Stock - </span>
                {prod.availableStock || prod.inStock}
              </div>
              {prod.fastDelivery ? (
                <div>Fast Delivery Available</div>
              ) : (
                <div>4 days delivery</div>
              )}
            </Card.Subtitle>
            {cart.some((p) => p.id === prod.id) ? (
              <Button
                variant="danger"
                onClick={(e) => handleRemoveCartDispatch(e, prod)}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                onClick={(e) => handleAddCartDispatch(e, prod)}
                disabled={!prod.inStock}
              >
                {!prod.inStock ? "Out of Stock" : "Add to Cart"}
              </Button>
            )}
          </Card.Body>
        </Card>
      </div >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SingleProduct;
