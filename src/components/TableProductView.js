import { Fragment, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import Image from 'react-bootstrap/Image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TableProductView({ products, setSelectComparedProducts, selectComparedProducts }) {
  const {
    state: { cart },
    dispatch,
    productDispatch
  } = CartState();

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
    setSelectComparedProducts(newSelected.slice(0, 3))
  };

  const isSelected = (prod) => selectComparedProducts.indexOf(prod) !== -1;

  return (
    <>
      <Table className='table-container' striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Exprected Delivery</th>
            <th>Add To Cart</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((prod) => {
            const isItemSelected = isSelected(prod);
            return (
              <Fragment key={prod.id}>
                <tr
                  className="products-table-container"
                  onClick={() => handleCardSelect(prod)}>
                  <td>
                    <Form.Check
                      inline
                      checked={isItemSelected}
                      name="group1"
                      type="checkbox"
                      id={`inline-checkbox-1`}
                    /></td>
                  <td>
                    <Image
                      src={`${prod.image}.jpg`}
                      alt={prod.name}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{prod.name}</td>
                  <td>
                    <span>
                      ₹ {prod.price.split(".")[0]}
                    </span>
                  </td>
                  <td>
                    <span>{prod.availableStock || prod.inStock}</span>
                  </td>
                  <td>{prod.fastDelivery ? (
                    <div>Fast Delivery</div>
                  ) : (
                    <div>4 days delivery</div>
                  )}</td>
                  <td> {cart.some((p) => p.id === prod.id) ? (
                    <Button
                      variant="danger"
                      className="cart-button"
                      onClick={(e) => handleRemoveCartDispatch(e, prod)}
                    >
                      Remove to Cart
                    </Button>
                  ) : (
                    <Button
                      className="cart-button"
                      onClick={(e) => handleAddCartDispatch(e, prod)}
                      disabled={!prod.inStock}
                    >
                      {!prod.inStock ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  )}</td>
                </tr>
              </Fragment>
            )
          }
          )
          }
        </tbody >
      </Table >
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
}

export default TableProductView;