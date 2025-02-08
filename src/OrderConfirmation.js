import React, { useContext, useEffect, useState } from 'react'
import AppContext from './context/AppContext'
import ShowOrderProduct from './ShowOrderProduct.js'
const  OrderConfirmation = ()=> {
  const {userOrder} = useContext(AppContext)
  const[latestOrder,setLatestOrder] = useState({});

  useEffect(()=>{

    if(userOrder){
      setLatestOrder(userOrder[0]);
    }
  },[userOrder])

  console.log("latest order",latestOrder);
  
  return (
    <>
    <div className="container my-5">
      <h1 className='text-center'>Your order has been confirm,</h1>
      <h3 className='text-center'>It will delivered soon</h3>
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
            <tr>
              <td>
              
              
              <ShowOrderProduct items={latestOrder?.orderItems}/>
              </td>
              <td>
                <ul style={{ fontWeight: "bold" }}>
                  <li>OrderId: {latestOrder?.orderId}</li>
                  <li>PaumentId: {latestOrder?.paymentId}</li>
                  <li>PaymentStatus: {latestOrder?.payStatus}</li>
                  <li>Name: {latestOrder?.userShipping?.fullname}</li>
                  <li>Phone: {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>City: {latestOrder?.userShipping?.city}</li>
                  <li>State: {latestOrder?.userShipping?.state}</li>
                  <li>Country: {latestOrder?.userShipping?.country}</li>
                  <li>Pincode: {latestOrder?.userShipping?.pincode}</li>
                  <li>Near By: {latestOrder?.userShipping?.address}</li> 
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        {/* <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          
        >
          Procced To Pay
        </button> */}
      </div>
    </>
  )
}

export default OrderConfirmation
