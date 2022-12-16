import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { CurrentPage, PerPage } from "src/redux/pageAction";
import "../../scss/paggination.scss";

const Pages = () => {
  const perPage = useSelector(PerPage);
  const currentPage = useSelector(CurrentPage);
  // const lastPage = useSelector((store) => store.page.lastPage);
  const lastPage = 10;
  const { page } = useParams();

  const activeStyle = (activePage) => {
    return +page === activePage ? "active" : "";
  };

  const midbtn = currentPage + 2 === lastPage - 2 ? currentPage + 2 : "...";
  const prevBtn = currentPage - 1 < 1 ? currentPage : currentPage - 1;
  const nextBtn = currentPage + 1 > lastPage - 4 ? page : currentPage + 1;

  const btnStyle = (activePage) => {
    return "inactive" + " " + activeStyle(activePage);
  };

  const pageHandler = (e) => {
    // e.preventDefault();
    if (e.target.id === "...") return;
    const id = +e.target.id;
    console.log(id);
    if (id < 1) return;
    if (midbtn === lastPage - 2) return;
  };

  return (
    <div className="page">
      <div className="pagebtn">
        <Link
          className="inactive"
          id={`${currentPage - 1}`}
          to={`/product/${prevBtn}`}
          onClick={pageHandler}
        >
          prev
        </Link>
        <Link
          className={btnStyle(currentPage)}
          to={`/product/${currentPage}`}
          id={currentPage}
          onClick={pageHandler}
        >
          {currentPage}
        </Link>
        <Link
          className={btnStyle(currentPage + 1)}
          to={`/product/${currentPage + 1}`}
          id={currentPage + 1}
          onClick={pageHandler}
        >
          {currentPage + 1}
        </Link>
        <Link
          className={btnStyle(midbtn)}
          to={`/product/${midbtn === "..." ? currentPage : midbtn}`}
          onClick={pageHandler}
          id={midbtn}
        >
          {midbtn}
        </Link>
        <Link
          className={btnStyle(lastPage - 1)}
          to={`/product/${lastPage - 1}`}
          id={`${lastPage - 1}`}
          onClick={pageHandler}
        >
          {lastPage - 1}
        </Link>
        <Link
          className={btnStyle(lastPage)}
          to={`/product/${lastPage}`}
          id={`${lastPage}`}
          onClick={pageHandler}
        >
          {lastPage}
        </Link>
        <Link
          className="inactive"
          id={currentPage + 1}
          to={`/product/${nextBtn}`}
          onClick={pageHandler}
        >
          next
        </Link>
      </div>
    </div>
  );
};

export default Pages;
