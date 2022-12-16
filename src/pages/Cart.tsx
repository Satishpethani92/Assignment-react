import * as React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartList, removeFromCart } from "src/redux/CategoriesSlice";
import "../scss/home.scss";
import "../scss/productlist..scss";
interface CartProps {}

const Cart = (props: CartProps) => {
  const cartList = useSelector(CartList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="mt-3">
      <div className="container productlist-wrapper">
        <div className="d-flex justify-content-center flex-wrap gap-4">
          {cartList?.map((product, index) => {
            return (
              <Card
                key={product.id}
                className="productlist"
                style={{ width: "18rem" }}
                onClick={() => {
                  navigate(`detail/${product.id}`, {
                    state: {
                      product: product,
                    },
                  });
                }}
              >
                <Card.Img
                  variant="top"
                  className="product-img"
                  src={product.thumbnail}
                />
                <Card.Body>
                  <p className="fs-5">{product.title}</p>
                  <p className="fs-6">
                    {product.description.substring(0, 80) + "..."}
                  </p>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <p className="fs-6 ps-2">Brand: {product.brand}</p>
                  <p className="fs-6 ps-2">Category: {product.category}</p>
                </ListGroup>
                <div className="d-flex p-2 justify-content-center">
                  <button className="btn btn-primary m-2" type="button">
                    Buy Now
                  </button>
                  <button
                    className="btn btn-secondary m-2"
                    type="button"
                    onClick={() => {
                      const findIndex = cartList?.findIndex(
                        (ele) => ele.id == product.id
                      );

                      dispatch(removeFromCart(findIndex));
                    }}
                  >
                    Remove From Cart
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
