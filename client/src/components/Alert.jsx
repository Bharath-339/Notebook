import React from "react";

export default function Alert(props) {
  return (
    <div>
      <div id="liveAlertPlaceholder"></div>
      <button type="button" className="btn btn-primary" id="liveAlertBtn">
        {props.message}
      </button>
    </div>
  );
}
