import React, { useContext, useEffect, useState } from "react";
import AppContext from "./context/AppContext";
import TableProduct from "./TableProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
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

  const handlePayment = async () => {
    const orderRespons = await axios.post(`${url}/payment/checkout`, {
      amount: price,
      qty: qty,
      cartItems: cart?.items,
      userShipping: userAddress,
      userId: user._id,
    });
    console.log("order response",orderRespons)
    const { orderId, amount: orderAmount } = orderRespons.data;
    var options = {
      key: "rzp_test_DIRvk4X2Pe6MFE", // Enter the Key ID generated from the Dashboard
      amount: orderAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Web DEV Amar",
      description: "Web DEV Amar",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const paymentData = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          amount: orderAmount,
          orderItems: cart?.items,
          userId: user._id,
          userShipping: userAddress,
        };

        const api = await axios.post(
          `${url}/payment//verify-payment`,
          paymentData
        );
        console.log("razorpay status",api.data)
        if (api.data.success) {
          clearCart();
          navigate("/orderConfirmation");
        }
      },
      prefill: {
        name: "Web DEV Amar",
        email: "amar007k@gmail.com",
        contact: "9004457364",
      },
      notes: {
        address: "Navi Mumbai",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>

        <table className="table table-bordered border-primary table-dark">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                Product Details
              </th>
              <th scope="col" className="text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <TableProduct cart={cart} />
              </td>
              <td>
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name: {userAddress?.fullname}</li>
                  <li>Phone: {userAddress?.phoneNumber}</li>
                  <li>City: {userAddress?.city}</li>
                  <li>State: {userAddress?.state}</li>
                  <li>Country: {userAddress?.country}</li>
                  <li>Pincode: {userAddress?.pincode}</li>
                  <li>Near By: {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Procced To Pay
        </button>
      </div>
    </>
  );
}

export default Checkout;
