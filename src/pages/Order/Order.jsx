import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import moment from "moment";

import "./order.css";

export default function Order() {
  const { orderId } = useParams();
  const { fetchOrderDetails, order } = useUser();

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  return (
    <div className="content">
      {order && (
        <div className="wrap-card">
          <h2>Order Details</h2>
          <p>
            Order id: <span>{order._id}</span>
          </p>
          <p>
            Status:
            <span className="txt-green">{order.status}</span>
          </p>
          <p>
            Creation Date:
            <span>{moment(order.date).format("DD MMM YY @ HH:mm")}</span>
          </p>
        </div>
      )}
    </div>
  );
}
