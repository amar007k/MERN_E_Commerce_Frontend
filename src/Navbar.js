import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "./context/AppContext";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilterData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterByCategory = (cat) => {
    setFilterData(
      products.filter((data) => data.category.toLowerCase() == cat)
    );
  };

  const filterByPrice = (price) => {
    setFilterData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>MERN E- Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type="text"
              placeholder="Search Product...."
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>
                <Link to={"/profile"} className="btn btn-info mx-3">
                  profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setFilterData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterByCategory("mobiles")}>
              Mobile's
            </div>
            <div className="items" onClick={() => filterByCategory("laptops")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterByCategory("camera's")}>
              Camera's
            </div>
            <div
              className="items"
              onClick={() => filterByCategory("headphones")}
            >
              Headphones
            </div>
            <div
              className="items"
              onClick={() => {
                filterByPrice(15999);
              }}
            >
              10000
            </div>
            <div
              className="items"
              onClick={() => {
                filterByPrice(47999);
              }}
            >
              20000
            </div>
            <div
              className="items"
              onClick={() => {
                filterByPrice(65999);
              }}
            >
              30000
            </div>
            <div
              className="items"
              onClick={() => {
                filterByPrice(70999);
              }}
            >
              50000
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
