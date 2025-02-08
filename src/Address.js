import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import AppContext from "./context/AppContext";


function Address() {
  const { shippingAddress,userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullname, address, city, state, country, pincode, phoneNumber } =
    formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    //alert("Your Form Has been Submited");
    const result = await shippingAddress(
      fullname,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullname: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };
  return (
    <>
      <div
        className="container my-5 p-4"
        style={{
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Shipping Address</h1>
        <form className="my-3" onSubmit={submitHandler}>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Full Name
              </label>
              <input
                name="fullname"
                value={formData.fullname}
                onChange={onChangHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleFormControlInput11"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Pincode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Address/Nearby
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChangHandler}
                className="form-control bg-dark text-light"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary" style={{fontWeight:'bold'}}>
              Submit
            </button>
          </div>
        </form>
        {userAddress && (
          <div className="d-grid col-6 mx-auto my-3">
            <button className="btn btn-warning" onClick={()=>navigate('/checkout')} style={{fontWeight:'bold'}}>User Old Address</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Address;
