import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function SignIn() {
  const { updateUser, signIn } = useUser();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    // email: "test@test.com",
    // password: "123456",
    email: "foo@email.com",
    password: "1234",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  return (
    <div className="wrap-card">
      <h1>Sign In</h1>
      <p>Please Enter Email and Password</p>
      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();
          signIn(state.email, state.password);
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
        <div>
          <button className="green-bg" type="submit">
            Confirm
          </button>
        </div>
      </form>
      <Link to={"/sign-up"}>Sign Up Instead</Link>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
