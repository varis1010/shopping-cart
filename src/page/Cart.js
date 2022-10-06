import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import CommonModel from "../components/common/CommonModel";
import { CartState } from "../context/Context";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";


const MODEL_HEADER_TEXT = "Your Order Details";
const MODEL_BODY_TEXT = "Order is Sucessfully accepted."

const Cart = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch
  } = CartState();
  const [total, setTotal] = useState();
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();

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

  const handleCartChange = (e, id, perLimit) => {
    let value = e.target.value;
    if ((cart.length !== 1) && (value > perLimit)) {
      notify()
    } else {
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
          id,
          qty: value,
        },
      })
    }
  }

  const handleProcessCart = () => {
    setModalShow(true);
    productDispatch({
      type: "SUCCESS_CART_ITEM_DISPATCH",
      payload: {
        cart
      },
    });
  }

  const clearCartHandler = () => {
    dispatch({
      type: "CLEAR_CART_ITEMS",
      payload: {
        cart: []
      },
    });
    history.push("/")
  }


  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      {cart.length > 0 ? (
        <>
          <div className="productContainer">

            <ListGroup>
              {cart.map((prod) => (
                <ListGroup.Item key={prod.id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={`${prod.image}.jpg`}
                        alt={prod.name}
                        width="70"
                        height="70"
                        fluid
                        rounded />
                    </Col>
                    <Col md={2}>
                      <span>{prod.name}</span>
                    </Col>
                    <Col md={2}>₹ {prod.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={prod.qty}
                        onChange={(e) => handleCartChange(e, prod.id, prod.perLimit)}
                      >
                        {[...Array(prod.inStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      >
                        <AiFillDelete fontSize="20px" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="filters summary">
            <span className="title">Subtotal ({cart.length}) items</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
            <CommonModel
              show={modalShow}
              headerText={MODEL_HEADER_TEXT}
              bodyText={MODEL_BODY_TEXT}
              onHide={() => setModalShow(false)}
              onSuccess={() => clearCartHandler(true)}
            />
            <Button type="button"
              onClick={() => handleProcessCart(true)}
              disabled={cart.length === 0}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="productContainer">
            <div className='empty-comparision-container'>
              <div className='empty-cart-btn'>
                <Button onClick={() => history.push('/')}>Back To Home</Button>
              </div>
              <span className='empty-comparision-text'>Cart is Empty!</span>
            </div>
          </div>
        </>
      )}

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
    </div>
  );
};

export default Cart;
