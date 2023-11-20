import React from "react";
import { Link } from "react-router-dom";

import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="wrap-card">
        <h1>This is a demo to showcase Werewolf Solutions API usage</h1>
        <p>
          Please checkout the{" "}
          <a href="https://github.com/Werewolf-Solutions/react-demo-website">
            github repo
          </a>
        </p>
        <p>
          Visit <a href="https://werewolf.solutions/">Werewolf Solutions</a> to
          make an account and create your own business
        </p>
        <p>
          Go to the <Link to={"/shop"}>shop</Link> to see live payments
        </p>
        {/* <p>
          Checkout this <a href="/">video</a> that shows a demo account
        </p> */}
      </div>
    </div>
  );
}
