import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function SignUp() {
  const { updateUser, signUp } = useUser();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    email: "test@test.com",
    password: "1234",
    password2: "1234",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  return (
    <div className="wrap-card">
      <h1>Sign Up</h1>
      <p>Please Enter Email and Passwords</p>
      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();
          signUp(state.email, state.password, state.password2);
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
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <input
          id="password2"
          placeholder="Repeat Password"
          type="password"
          value={state.password2}
          onChange={handleChange}
          required
        />
        <div>
          <button className="green-bg" type="submit">
            Confirm
          </button>
        </div>
      </form>
      <Link to={"/sign-in"}>Sign In Instead</Link>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
