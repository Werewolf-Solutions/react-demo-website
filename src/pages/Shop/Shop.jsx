import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { usePopUp } from "../../contexts/PopUpContext";

import "./shop.css";

const PUBLIC_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_REACT_APP_PUBLIC_URL
    : "http://localhost:5000/";

export default function Shop() {
  const { inventoryItems, getInventoryItems, addToCart, cart } = useUser();
  const { openPopUp } = usePopUp();

  useEffect(() => {
    getInventoryItems();
  }, []);
  return (
    <div className="wrap-card">
      <h1>Shop</h1>
      {cart.length !== 0 && <Link to={"/checkout/1"}>checkout</Link>}
      <div className="shop-items">
        {inventoryItems &&
          inventoryItems.map((item) => (
            <div className="item-card">
              <div>
                <p>
                  {item.name} - £{(Number(item.price) / 100).toFixed(2)}
                </p>
                <p>Quantity left: {item.quantity}</p>
              </div>
              <div>
                <img src={PUBLIC_URL + item.img} className="item-img"></img>
              </div>
              <button
                className="green-bg"
                onClick={() => {
                  addToCart(item);
                  openPopUp("Item added to cart", 1000);
                }}
              >
                Add to cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
