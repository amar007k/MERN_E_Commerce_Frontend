import React, { useEffect, useState } from "react";

function ShowOrderProduct({ items }) {
  
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty += items[i].qty;
        price += items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [items]);

  return (
    <>
      <table className="table table-bordered border-primary table-dark text-center">
        <thead>
          <tr>
            <th scope="col">Product Img</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
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
         
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ShowOrderProduct;
