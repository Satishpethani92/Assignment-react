import React, { useEffect, useState } from "react";
//import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Navbar, Container, Nav, Form, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../scss/productlist..scss";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Pages from "src/Components/UI/Paggination";
import {
  addToCart,
  CartList,
  Category,
  Products,
  removeFromCart,
  setCategories,
  setProduct,
} from "src/redux/CategoriesSlice";
import { PerPage, setInitialState } from "src/redux/pageAction";
import auth, { AuthData, ProductDto } from "src/services/auth";
import "../scss/home.scss";
import Footer from "./Footer";

interface HomeProps {}
export declare type Products = {
  limit: number;
  skip: number;
  total: number;
  products: ProductDto[];
};
const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState<AuthData>();
  const dispatch = useDispatch();
  const categoryList = useSelector(Category);
  const productList = useSelector(Products);
  const cartList = useSelector(CartList);
  const [selectedCategory, setSelectedCategory] = useState<string>("none");
  const params = useParams();
  const { pageId } = params;
  useEffect(() => {
    const userValue = JSON.parse(localStorage.getItem("_auth"));
    setUserData(userValue);
  }, []);

  const onLogout = () => {
    localStorage.setItem("_auth", JSON.stringify(""));
    navigate("/login", { replace: true });
  };

  const getCategories = async () => {
    try {
      const response = await auth.categories();
      dispatch(setCategories(response));
    } catch (error) {}
  };
  const perPage = useSelector(PerPage);
  const currentPage = +pageId ? +pageId : 1;

  const initialFetch = async () => {
    try {
      const products = await auth.productList(currentPage, perPage);
      dispatch(setProduct(products.products));
      if (products.length !== 0) {
        dispatch(
          setInitialState({
            currentPage,
            lastPage: products.total / perPage,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();

    initialFetch();
  }, []);
  useEffect(() => {
    console.log();
    initialFetch();
  }, [pageId]);

  if (!localStorage.getItem("_auth")) return <Navigate to={"login"} replace />;
  return (
    <div>
      <div>
        <Navbar expand="md">
          <Container>
            <Navbar.Brand>{userData?.firstName ?? ""}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav-hover gap-2">
                <Nav.Link
                  tabIndex={1}
                  className={`fw-600 py-1 px-3 ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                  onClick={() => navigate("/")}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  tabIndex={1}
                  className={`fw-600 py-1 px-3 ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                  onClick={() => navigate("/cart")}
                >
                  Cart
                </Nav.Link>
                <Nav.Link
                  tabIndex={1}
                  className={`fw-600 py-1 px-3 ${
                    location.pathname === "/" ? "active-link" : ""
                  }`}
                >
                  {`Welcome to the work ${userData?.firstName ?? ""} !!!`}
                </Nav.Link>
              </Nav>

              <Nav className="d-flex flex-fill justify-content-end ">
                <Nav.Link
                  tabIndex={2}
                  className="align-self-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <Form.Group className="mb-3" controlId="country">
                    <Form.Select
                      value={selectedCategory}
                      onChange={(ev: any) => {
                        setSelectedCategory(ev.target.value);
                      }}
                      // isInvalid={error != undefined}
                    >
                      <option key={`project-placeholder`} value={"none"}>
                        Select Category
                      </option>

                      {categoryList?.map((e: string, index: number) => {
                        return (
                          <option key={`project-${index}`} value={e}>
                            {e}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Nav.Link>
                <Nav.Link
                  tabIndex={3}
                  className="align-self-center"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => onLogout()}
                >
                  <div className="align-items-center d-flex">
                    <span
                      className="fw-600 px-2 text-center"
                      style={{ color: "#72C8C7" }}
                    >
                      Logout
                    </span>
                  </div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <div className="container productlist-wrapper">
          <div className="d-flex justify-content-center flex-wrap gap-4">
            {productList
              ?.filter((e) => {
                if (selectedCategory == "none") {
                  return e;
                } else {
                  return e.category == selectedCategory;
                }
              })
              .map((product) => (
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
                      onClick={(e) => {
                        e.stopPropagation();
                        const findIndex = cartList?.findIndex(
                          (ele) => ele.id == product.id
                        );
                        console.log("findindex", findIndex);
                        if (findIndex == -1) {
                          dispatch(addToCart(product));
                        } else {
                          dispatch(removeFromCart(findIndex));
                        }
                      }}
                    >
                      {cartList?.findIndex((ele) => ele.id == product.id) != -1
                        ? "Remove From Cart"
                        : "Add to cart"}
                    </button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
        <Pages />
      </div>

      <div>{cartList.length}</div>
      <Footer />
    </div>
  );
};

export default Home;
