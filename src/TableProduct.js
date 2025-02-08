import React, { useContext, useEffect, useState } from "react";
import AppContext from "./context/AppContext";

function TableProduct({ cart }) {
  const { decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <>
      <table className="table table-bordered border-primary table-dark text-center">
        <thead>
          <tr>
            <th scope="col">Product Img</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Qty++</th>
            <th scope="col">Qty--</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <th scope="row">
                <img
                  src={product.imgSrc}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
              </th>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.qty}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    addToCart(
                      product?.prodId,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgSrc
                    )
                  }
                >
                  Add
                </button>
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => decreaseQty(product?.prodId, 1)}
                >
                  Sub
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure,want remove product from the cart"
                      )
                    ) {
                      removeFromCart(product?.prodId);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row"></th>
            <td>
              {" "}
              <button
                type="button"
                className="btn btn-primary"
                style={{ fontWeight: "bold" }}
              >
                Total
              </button>
            </td>
            <td>
              {" "}
              <button
                type="button"
                className="btn btn-warning"
                style={{ fontWeight: "bold" }}
              >
                {price}
              </button>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-info"
                style={{ fontWeight: "bold" }}
              >
                {qty}
              </button>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default TableProduct;
