import React from "react";
import { Link } from "react-router-dom";
import "./logo.css";

export default function Logo() {
  return (
    <Link className="logo-a" to="/">
      <img className="logo" src={require("../../assets/logo.png")} />
    </Link>
  );
}
