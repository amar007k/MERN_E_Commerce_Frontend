import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from "../../ShowOrderProduct";

function Profile() {
  const { user, userOrder } = useContext(AppContext);
  return (
    <>
      <div className="container text-center my-5">
        <h1>Welcome, {user?.name}</h1>
        <h3>{user?.email}</h3>
        <h1>Total Order :- {userOrder?.length}</h1>
      </div>
      <div className="container">
        <table className="table table-bordered border-primary table-dark">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                Order Items
              </th>
              <th scope="col" className="text-center">
                OrderDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody>
            {userOrder && (
              <>
                {userOrder?.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <ShowOrderProduct items={product?.orderItems} />
                    </td>
                    <td>
                      <ul style={{ fontWeight: "bold" }}>
                        <li>OrderId: {product?.orderId}</li>
                        <li>PaumentId: {product?.paymentId}</li>
                        <li>PaymentStatus: {product?.payStatus}</li>
                        <li>Name: {product?.userShipping?.fullname}</li>
                        <li>Phone: {product?.userShipping?.phoneNumber}</li>
                        <li>City: {product?.userShipping?.city}</li>
                        <li>State: {product?.userShipping?.state}</li>
                        <li>Country: {product?.userShipping?.country}</li>
                        <li>Pincode: {product?.userShipping?.pincode}</li>
                        <li>Near By: {product?.userShipping?.address}</li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5"></div>
    </>
  );
}

export default Profile;
