import React, { createContext, useContext, useState } from "react";
import { api } from "../apiCalls/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [user, setUser] = useState();
  const [order, setOrder] = useState();
  const [inventoryItems, setInventoryItems] = useState();
  const [cart, setCart] = useState(initialCart);
  const [totalAmount, setTotalAmount] = useState(0);

  const updateUser = async () => {
    try {
      const res = await api.getUser();
      console.log(res);
      if (res.data && res.data.user) {
        const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
        const paymentIntent = JSON.parse(localStorage.getItem("paymentIntent"));
        if (paymentMethod) {
          res.data.user.paymentMethod = paymentMethod;
        }
        if (paymentIntent) {
          res.data.user.paymentIntent = paymentIntent;
        }
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    const res = await api.signOut();
    console.log(res);
    if (res.status === 200) {
      setUser(null);
    }
  };

  const signIn = async (email, password) => {
    const res = await api.signIn(email, password);
    console.log(res);
    if (res.data.user) {
      setUser(res.data.user);
    }
  };

  const signUp = async (email, password, password2) => {
    const res = await api.signUp(email, password, password2);
    console.log(res);
    if (res.data.user) {
      setUser(res.data.user);
    }
  };

  const createGuestSession = async (email) => {
    const res = await api.createGuestSession(email);
    console.log(res);
    if (res.data.user) {
      setUser(res.data.user);
    }
  };

  const createPaymentMethod = async (type, card, billingDetails) => {
    const res = await api.createPaymentMethod(type, card, billingDetails);
    console.log(res);
    if (res.data.payment_method) {
      user.paymentMethod = res.data.payment_method;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(res.data.payment_method)
      );
      setUser(user);
      updateUser();
    }
  };

  const createPaymentIntent = async (
    amount,
    currency,
    paymentMethod,
    items
  ) => {
    const res = await api.createPaymentIntent(
      amount,
      currency,
      paymentMethod,
      items
    );
    console.log(res);
    if (res.data.payment_intent && res.data.sale) {
      user.sale = res.data.sale;
      user.paymentIntent = res.data.payment_intent;
      setUser(user);
      localStorage.setItem(
        "paymentIntent",
        JSON.stringify(res.data.payment_intent)
      );
    }
  };

  const confirmPaymentIntent = async (paymentIntent, sale) => {
    const res = await api.confirmPaymentIntent(paymentIntent, sale);
    console.log(res);
    if (res.data.payment_intent && res.data.order) {
      user.paymentIntent = res.data.payment_intent;
      user.order = res.data.order;
      setUser(user);
    }
  };

  const handleUploadFile = async (file) => {
    const res = await api.uploadFile(file);
    console.log(res);
    if (res.data.file) {
      user.file = res.data.file;
      setUser(user);
    }
  };

  const getInventoryItems = async () => {
    let res = await api.getInventoryItems();
    console.log(res.data);
    if (res.data.inventoryItems) {
      setInventoryItems(res.data.inventoryItems);
    }
  };

  const addToCart = (item) => {
    console.log(item);
    const existingProduct = cart.find(
      (prod) => prod._id.toString() === item._id.toString()
    );
    console.log(existingProduct);
    if (existingProduct) {
      const updatedCart = cart.map((product) => {
        if (product._id.toString() === item._id.toString()) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      const product = inventoryItems.find(
        (prod) => prod._id.toString() === item._id.toString()
      );
      console.log(product);
      if (product) {
        let updatedCart = [...cart, { ...product, quantity: 1 }];
        console.log(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
      }
    }
    calculateTotalAmount();
  };

  const deleteAllFromCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    calculateTotalAmount();
  };

  const deleteOneFromCart = () => {};

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    for (const item of cart) {
      if (item.price !== undefined && item.quantity !== undefined) {
        totalAmount += item.price * item.quantity;
      }
    }
    totalAmount = totalAmount / 100;
    setTotalAmount(totalAmount);
  };

  const fetchOrderDetails = async (orderId) => {
    const res = await api.fetchOrderDetails(orderId);
    console.log(res);
    if (res.data.order) {
      localStorage.setItem("order", JSON.stringify(res.data.order));
      setOrder(res.data.order);
    }
  };

  return (
    <UserContext.Provider
      value={{
        updateUser,
        user,
        signOut,
        signIn,
        signUp,
        createGuestSession,
        createPaymentMethod,
        createPaymentIntent,
        confirmPaymentIntent,
        handleUploadFile,
        getInventoryItems,
        inventoryItems,
        addToCart,
        cart,
        deleteAllFromCart,
        deleteOneFromCart,
        setUser,
        calculateTotalAmount,
        totalAmount,
        fetchOrderDetails,
        order,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
