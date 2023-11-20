import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Logo from "../../components/Logo/Logo";
import { useUser } from "../../contexts/UserContext";
import "./header.css";

export default function Header() {
  const { user, signOut, cart, totalAmount, calculateTotalAmount } = useUser();
  const [totalQuantity, setTotalQuantity] = useState(null);

  function calculateTotalQuantity(cart) {
    let totalQuantity = 0;

    // Iterate through each item in the cart
    for (let i = 0; i < cart.length; i++) {
      // Add the quantity of each item to the total
      totalQuantity += cart[i].quantity;
    }

    setTotalQuantity(totalQuantity);
  }

  useEffect(() => {
    calculateTotalQuantity(cart);
    calculateTotalAmount();
  }, [cart]);
  return (
    <div className="header">
      <Link to={"/cart"}>
        <CartIcon totalQuantity={totalQuantity} />
        {totalAmount != 0 && "£ " + totalAmount.toFixed(2)}
      </Link>
      <Logo />
      {user ? (
        <div className="account">
          <span id="my-anchor" className="anchor">
            {user.username}
          </span>
          <div className="tooltip">
            <button className="sign-out-button" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <Link to={"/sign-in"}>sign in</Link>
      )}
    </div>
  );
}

const CartIcon = ({ totalQuantity }) => {
  return (
    <div className="cart-icon">
      <AiOutlineShoppingCart className="info-icon" />
      {totalQuantity > 0 && <div className="icon-badge">{totalQuantity}</div>}
    </div>
  );
};
