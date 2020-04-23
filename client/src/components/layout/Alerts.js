import React, { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => {
      return (
        <div className={`alert alert-${alert.type}`} key={alert.id}>
          <i className="fa fa-info-circle"></i> {alert.msg}
        </div>
      );
    })
  );
};

export default Alerts;
