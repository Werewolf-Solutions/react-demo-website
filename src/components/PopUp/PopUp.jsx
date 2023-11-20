import React, { useEffect } from "react";
import { usePopUp } from "../../contexts/PopUpContext";
import "./popup.css";
import { useUser } from "../../contexts/UserContext";

const PopUp = () => {
  const {
    message,
    isPopupOpen,
    cookieSettings,
    confirmation,
    handleConfirmation,
    closePopUp,
  } = usePopUp();
  const { updateUser } = useUser();

  return (
    <>
      {isPopupOpen && (
        <>
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-card">
                <div className="popup-message">
                  <p>{message}</p>
                  {cookieSettings && (
                    <button
                      className="button"
                      onClick={() => {
                        localStorage.setItem(
                          "userAcceptedNecessaryCookies",
                          "true"
                        );
                        closePopUp();
                      }}
                    >
                      Accept
                    </button>
                  )}
                  {confirmation && (
                    <>
                      <button
                        className="button"
                        onClick={() => {
                          handleConfirmation();
                          updateUser();
                          closePopUp();
                        }}
                      >
                        Confirm
                      </button>
                      <button className="button green" onClick={closePopUp}>
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PopUp;
