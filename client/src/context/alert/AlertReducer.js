import React from "react";
import { SET_ALERT, REMOVE_ALERT } from "../Types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];

    case REMOVE_ALERT:
      return state.filter((alert) => {
        return alert.id !== action.payload;
      });

    default:
      return state;
  }
};

export default AlertReducer;
