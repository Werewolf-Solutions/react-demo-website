import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./checkout.css";

const PUBLIC_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_REACT_APP_PUBLIC_URL
    : "http://localhost:5000/";

export default function Checkout() {
  const {
    user,
    updateUser,
    signOut,
    createGuestSession,
    createPaymentMethod,
    createPaymentIntent,
    confirmPaymentIntent,
    handleUploadFile,
    deleteAllFromCart,
    deleteOneFromCart,
    cart,
    setUser,
    totalAmount,
  } = useUser();
  const { step } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    type: "card",
    email: "client@email.com",
    cardNumber: "4242424242424242",
    expMonth: 1,
    expYear: 2033,
    cvc: "314",
    line: "line",
    city: "city",
    country: "US",
    postcode: "postcode",
  });
  const [sale, setSale] = useState();
  const [file, setFile] = useState();
  const [img, setImg] = useState();

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onFileChange = (event) => {
    // Update the state
    if (event.target.files[0]) {
      console.log("event.target.files", event.target.files);
      setFile(event.target.files[0]);
      let image = URL.createObjectURL(event.target.files[0]);
      setImg(image);
    }
  };

  const renderStep = () => {
    console.log(user);
    switch (step) {
      case "1":
        // Step 1 - email or sign in/up
        return (
          <>
            {!user && (
              <div>
                <p>
                  Please Enter Your Email or{" "}
                  <Link to={"/sign-in"}>sign in/up</Link>
                </p>
                <form
                  className="form"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    createGuestSession(state.email);
                  }}
                >
                  <input
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    type="email"
                    value={state.email}
                    required
                  />
                  <button type="submit" className="green-bg">
                    Next
                  </button>
                </form>
              </div>
            )}
            {user && (
              <div>
                <p>
                  Please make sure this is the right email:{" "}
                  <span className="text-focus">{user.email}</span>
                </p>
                <button
                  className="green-bg"
                  onClick={() => navigate("/checkout/2")}
                >
                  Yes, next
                </button>
                <button className="" onClick={signOut}>
                  Change email
                </button>
              </div>
            )}
          </>
        );
      case "2":
        // Step 2 - billing and shipping address
        return (
          <div>
            <form
              className="form"
              onSubmit={async (e) => {
                e.preventDefault();
                console.log("billing, shipping details");
                navigate("/checkout/3");
              }}
            >
              {/* <select id="shipping" onChange={handleChange}>
                <option value="delivery">Delivery</option>
                <option value="collection">Collection</option>
              </select> */}
              <input
                id="line"
                placeholder="Line"
                onChange={handleChange}
                type="line"
                value={state.line}
                required
              />
              <input
                id="city"
                placeholder="City"
                onChange={handleChange}
                type="city"
                value={state.city}
                required
              />
              <input
                id="country"
                placeholder="Country"
                onChange={handleChange}
                type="country"
                value={state.country}
                required
              />
              <input
                id="postcode"
                placeholder="Postcode"
                onChange={handleChange}
                type="postcode"
                value={state.postcode}
                required
              />
              <button type="submit" className="green-bg">
                Confirm billing and shipping address
              </button>
            </form>
          </div>
        );

      case "3":
        // Step 3 - payment method - createPaymentIntent
        console.log(user);
        return (
          <div>
            {user && user.paymentMethod && (
              <div>
                <p>Card selected</p>
                <p>****-****-****-{user.paymentMethod.card.last4}</p>
                <button
                  className="green-bg"
                  onClick={() => {
                    navigate("/checkout/4");
                  }}
                >
                  Next
                </button>
              </div>
            )}
            {user &&
              !user.paymentMethod &&
              user.payment_methods &&
              user.payment_methods.map((payment_method) => {
                return (
                  <div>
                    <p>Your cards</p>
                    <button
                      className="green-bg"
                      onClick={() => {
                        user.paymentMethod = payment_method;
                        setUser(user);
                        navigate("/checkout/4");
                      }}
                    >
                      ****-****-****-{payment_method.card.last4}
                    </button>
                  </div>
                );
              })}
            <p>Enter a new card</p>
            <div>
              <form
                className="form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  let card = {
                    number: state.cardNumber,
                    exp_month: state.expMonth,
                    exp_year: state.expYear,
                    cvc: state.cvc,
                  };
                  let billingDetails = {
                    address: {
                      line1: state.line,
                      city: state.city,
                      country: state.country,
                      postal_code: state.postcode,
                    },
                  };
                  console.log(billingDetails);
                  await createPaymentMethod(state.type, card, billingDetails);
                  console.log(user);
                  let paymentMethod = user.paymentMethod;
                  console.log(cart);
                  console.log(totalAmount);
                  createPaymentIntent(totalAmount, "gbp", paymentMethod, cart);
                  console.log(user);
                  navigate("/checkout/4");
                }}
              >
                {/* <select id="type" onChange={handleChange}>
                  <option value="card">Card</option>
                </select> */}
                <input
                  id="cardNumber"
                  placeholder="Card Number"
                  onChange={handleChange}
                  type="number"
                  value={state.cardNumber}
                  required
                />
                <input
                  id="expMonth"
                  placeholder="Expiry Month"
                  onChange={handleChange}
                  type="number"
                  value={state.expMonth}
                  required
                />
                <input
                  id="expYear"
                  placeholder="Expiry Year"
                  onChange={handleChange}
                  type="number"
                  value={state.expYear}
                  required
                />
                <input
                  id="cvc"
                  placeholder="CVC"
                  onChange={handleChange}
                  type="number"
                  value={state.cvc}
                  required
                />
                <button type="submit" className="green-bg">
                  Confirm payment method
                </button>
              </form>
            </div>
          </div>
        );

      case "4":
        // Step 4 - review order and confirm
        if (!user) {
          return navigate("/checkout/1");
        }
        console.log(user.paymentMethod);
        return (
          <div>
            <div>
              <p>Email: {user.email}</p>
              <p>Card: ****-****-****-{user.paymentMethod.card.last4}</p>
              <p>
                Address: {user.paymentMethod.billing_details.address.line1},{" "}
                {user.paymentMethod.billing_details.address.city},{" "}
                {user.paymentMethod.billing_details.address.country},{" "}
                {user.paymentMethod.billing_details.address.postal_code}
              </p>
              <p>Total Cart: {totalAmount}</p>
              <Link to={"/cart"}>Edit cart</Link>
            </div>
            <form
              className="form"
              onSubmit={async (e) => {
                e.preventDefault();
                console.log("upload file and confirm payment intent");
                console.log(user);
                await confirmPaymentIntent(user.paymentIntent, user.sale);
                // handleUploadFile(file, user.paymentIntent);
                navigate("/checkout/5");
                deleteAllFromCart();
              }}
            >
              {/* <p>Upload your design!</p>
              <input type="file" onChange={onFileChange} required /> */}
              {/* <img src={img} className="item-img"></img> */}
              {cart &&
                cart.map((item) => (
                  <div>
                    <div>
                      <p>
                        {item.name} - £{(Number(item.price) / 100).toFixed(2)}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div>
                      <img
                        src={PUBLIC_URL + item.img}
                        className="item-img"
                      ></img>
                    </div>
                  </div>
                ))}
              <button type="submit" className="green-bg">
                Confirm order
              </button>
            </form>
          </div>
        );
      case "5":
        return (
          <div>
            <p>Thank you for your purchase.</p>
            <p>
              Keep an eye on the order{" "}
              <Link to={`/order/${user.order._id}`}>here</Link>
            </p>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div className="wrap-card">
      <h1>Checkout</h1>
      {step === 1 && !user && (
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      )}
      {step != 1 && (
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      )}
      {renderStep()}
    </div>
  );
}
