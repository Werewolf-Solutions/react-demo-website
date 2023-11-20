import React from "react";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

const PUBLIC_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_REACT_APP_PUBLIC_URL
    : "http://localhost:5000/";

export default function Cart() {
  const { cart, deleteAllFromCart } = useUser();

  const deleteOneFromCart = () => {};
  return (
    <div className="wrap-card">
      <h1>Cart</h1>
      {cart.length === 0 && (
        <p>
          Cart empty!
          <p>
            Go to the <Link to={"/shop"}>Shop</Link>
          </p>
        </p>
      )}
      {cart.length !== 0 && <Link to={"/checkout/1"}>checkout</Link>}
      {cart &&
        cart.map((item) => (
          <div>
            <div>
              <p>
                {item.name} - £{(Number(item.price) / 100).toFixed(2)}
              </p>
              <p>Quantity left: {item.quantity}</p>
            </div>
            <div>
              <img src={PUBLIC_URL + item.img} className="item-img"></img>
            </div>
            <button onClick={() => deleteOneFromCart(item)}>Delete One</button>
            <button onClick={() => deleteAllFromCart(item)}>Delete All</button>
          </div>
        ))}
    </div>
  );
}
