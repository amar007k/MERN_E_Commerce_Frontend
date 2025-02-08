import React, { useContext, useEffect, useState } from "react";
import AppContext from "./context/AppContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

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
    
    {cart?.items?.length == 0 ?(
      <>
      <div className="text-center my-5">
      <button
          className="btn btn-warning mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
          onClick={()=>navigate("/")}
        >
          Continue Shopping...
        </button>
        </div>
      </>
    ):(
      <>
       <div className="my-5 text-center">
        <button
          className="btn btn-info mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Qty :- {qty}
        </button>
        <button
          className="btn btn-warning mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Price :- {price}
        </button>
      </div>
      </>
    )}

     
      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-3 bg-dark my-5 text-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  border: "2px solid yellow",
                }}
              />
            </div>
            <div className="cart_desc "></div>
            <h2>{product.title}</h2>
            <h4>{product.price}</h4>
            <h4>Qty:- {product.qty}</h4>
            <div className="cart_action">
              <button
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => decreaseQty(product?.prodId, 1)}
              >
                Qty--
              </button>
              <button
                className="btn btn-info mx-3"
                style={{ fontWeight: "bold" }}
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
                Qty++
              </button>
              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "bold" }}
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
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-5">
          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold" }}
            onClick={()=>navigate('/shipping')}
          >
            Checkout
          </button>
          <button
            className="btn btn-danger mx-3"
            style={{ fontWeight: "bold" }}
            onClick={()=>{
              if(window.confirm("Are you sure, want to clear from cart...")){
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
}

export default Cart;
