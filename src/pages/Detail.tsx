import * as React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductDto } from "src/services/auth";
interface DetailProps {}
declare type DetailState = {
  product?: ProductDto;
};
const Detail = (props: DetailProps) => {
  const location = useLocation();
  const state: DetailState = location.state;
  const { product } = state;
  const navigate = useNavigate();
  return (
    <div>
      <Card key={product.id} className="productlist" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          className="product-img"
          src={product.thumbnail}
        />
        <Card.Body>
          <p className="fs-5">{product.title}</p>
          <p className="fs-6">{product.description.substring(0, 80) + "..."}</p>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <p className="fs-6 ps-2">Brand: {product.brand}</p>
          <p className="fs-6 ps-2">Category: {product.category}</p>
        </ListGroup>
        <div className="d-flex p-2 justify-content-center">
          <button className="btn btn-primary m-2" type="button">
            Buy Now
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Detail;
