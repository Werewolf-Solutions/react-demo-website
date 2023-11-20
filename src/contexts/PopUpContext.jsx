import React, { createContext, useContext, useState, useEffect } from "react";
import PopUp from "../components/PopUp/PopUp";

const PopUpContext = createContext();

export const PopUpProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(0);
  const [cookieSettings, setCookieSettings] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    let timer;
    if (isPopupOpen && duration) {
      timer = setTimeout(() => {
        setCookieSettings(false);
        setIsPopupOpen(false);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isPopupOpen, duration]);

  const openPopUp = (message, duration) => {
    setMessage(message);
    setDuration(duration);
    setIsPopupOpen(true);
  };

  const openCookieSettings = (message, duration) => {
    setMessage(message);
    setDuration(duration);
    setCookieSettings(true);
    setIsPopupOpen(true);
  };

  const openConfirmation = (message, duration) => {
    setMessage(message);
    setDuration(duration);
    setConfirmation(true);
    setIsPopupOpen(true);
  };

  const handleConfirmation = () => {
    setConfirmed(true);
  };

  const closePopUp = () => {
    setMessage("");
    setDuration(0);
    setCookieSettings(false);
    setIsPopupOpen(false);
    setConfirmation(false);
    setConfirmed(false);
  };

  return (
    <PopUpContext.Provider
      value={{
        openPopUp,
        openCookieSettings,
        openConfirmation,
        handleConfirmation,
        closePopUp,
        isPopupOpen,
        message,
        cookieSettings,
        confirmation,
        confirmed,
      }}
    >
      <PopUp />
      {children}
    </PopUpContext.Provider>
  );
};

export const usePopUp = () => useContext(PopUpContext);
