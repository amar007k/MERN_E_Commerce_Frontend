import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppState(props) {
 const url = "http://localhost:8080/api";

  //const url = "https://mern-e-commerce-1-t3d8.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const[userAddress,setUserAddress] = useState("");
  const [userOrder,setUserOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setProducts(api.data.products);
      setFilterData(api.data.products);
      userProfile();
     
    };
    fetchProduct();
    userCart();
    getAddress();
    user_Order();
  }, [token, reload]);

  useEffect(() => {
    let lstoken = localStorage.getItem("Token");

    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  // Register user

  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    //alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    console.log("user register", api);
  };

  //login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    //alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("Token", api.data.token);
    return api.data;
  };

  //logout user

  const logout = () => {
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem("token");
    toast.success("Logout Successfully....", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //console.log("user profile",api.data);
    setUser(api.data.user);
  };

  //add To Cart
  const addToCart = async (prodId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { prodId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    console.log("my cart", api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //user cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //console.log("user profile",api.data);
    //setUser(api.data.user);
    setCart(api.data.cart);
  };

  // --qty
  const decreaseQty = async (prodId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { prodId, qty },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //console.log("user profile",api.data);
    //setUser(api.data.user);
    //setCart(api.data.cart);
  };

  //remove item from the cart
  const removeFromCart = async (prodId) => {
    const api = await axios.delete(
      `${url}/cart/remove/${prodId}`,
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //console.log("user profile",api.data);
    //setUser(api.data.user);
    //setCart(api.data.cart);
  };

  //clear cart
  const clearCart = async () => {
    const api = await axios.delete(
      `${url}/cart/clear`,
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //console.log("user profile",api.data);
    //setUser(api.data.user);
    //setCart(api.data.cart);
  };

  //Add Shipping Address
  const shippingAddress = async (fullname,address,city,state,country,pincode,phoneNumber) => {
    const api = await axios.post(`${url}/address/add`,{fullname,address,city,state,country,pincode,phoneNumber},{
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data
    
  };

//get user latest address

const getAddress = async () => {
  const api = await axios.get(`${url}/address/get`, {
    headers: {
      "Content-Type": "Application/json",
      Auth:token
    },
    withCredentials: true,
  });
 // console.log("User Address",api.data.userAddress);
  setUserAddress(api.data.userAddress)
 
};

//get user order

const user_Order = async () => {
  const api = await axios.get(`${url}/payment/userorder`, {
    headers: {
      "Content-Type": "Application/json",
      Auth:token
    },
    withCredentials: true,
  });
 console.log("User order",api.data);
 setUserOrder(api.data)
 
};

console.log("user order", userOrder)
  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        isAuthenticated,
        setIsAuthenticated,
        filterData,
        setFilterData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
