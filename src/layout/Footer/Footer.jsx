import React from "react";
import { FaDiscord, FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";
import WerewolfSolutions from "../../assets/ws-logo3.png";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <a
        href="https://github.com/Werewolf-Solutions/react-demo-website"
        target="_blank"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/company/werewolf-solutions"
        target="_blank"
      >
        <FaLinkedin />
      </a>
      <a href="https://discord.gg/rZDF7ZrR" target="_blank">
        <FaDiscord />
      </a>
      <a href="https://t.me/+IgwxaWzM-U9kUsG_" target="_blank">
        <FaTelegram />
      </a>
      <a href="https://werewolf.solutions/" target="_blank">
        <img src={WerewolfSolutions} className="ws-icon" />
      </a>
    </div>
  );
}
