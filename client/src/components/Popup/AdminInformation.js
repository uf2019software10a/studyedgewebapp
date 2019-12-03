import React from "react";
import "./Popup.css";
import militaryToStandard from "../TimeUtility";

class AdminInformation extends React.Component {
  render() {
    const { closePopup, text, session } = this.props;
    const start_dt_split = session.start.split(" ");
    const start_time = militaryToStandard(session.start);
    const end_time = militaryToStandard(session.end);

    return (
      <div className="popup">
        <div className="close" onClick={() => closePopup()}>
          Back
        </div>
        <h1>{text}</h1>
        <div className="edit" onClick={() => closePopup()}>
          Edit
        </div>
        <div className="popup_inner">
          <div className="message">
            <p>
              <b>Session details:</b>
            </p>
            <p>
              {session.class} Exam {session.exam_num}
            </p>
            <p>{session.tutor}</p>
            <p>
              {start_dt_split[0]} {start_dt_split[1]}
            </p>
            <p>
              {start_time} - {end_time}
            </p>
            <p>location: PLACE/URL</p>
            <p>
              <b>Attendees</b>
            </p>
            <p>PERSON 1 : email : requests</p>
            <p>PERSON 2 : email : requests</p>
            <p>PERSON 3 : email : requests</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminInformation;
