import React from "react";
import "./Popup.css";
import { militaryToStandard, getMonthName } from "../DateTimeUtil";
import axios from "axios";

class ViewSlot extends React.Component {
  componentDidMount = () => {
    axios.get(`/api/reservations/exam=${this.props.session._id}`).then(res => {
      const data = res.data;
      //console.log(data);
      this.comments = data.map(({ topics }) => topics).join(" | ");
    });
  };

  render() {
    const { closePopup, session, editPopup } = this.props;

    const startDate = new Date(session.start);
    const endDate = new Date(session.end);
    const month = getMonthName(startDate.getMonth() + 1);
    const day = startDate.getDate();
    const startTime = militaryToStandard(
      startDate.getHours(),
      startDate.getMinutes()
    );
    const endTime = militaryToStandard(
      endDate.getHours(),
      endDate.getMinutes()
    );

    return (
      <div className="popup">
        <div className="close" onClick={() => closePopup()}>
          X
        </div>
        <div className="edit" onClick={() => editPopup()}>
          Edit
        </div>
        <h1>View Slot</h1>
        <div className="popup_inner">
          <div className="message">
            <p>Class: {session.class}</p>
            <p>Exam: {session.exam_num} </p>
            <p>Description: {session.description} </p>
            <p>
              Date: {month} {day}{" "}
            </p>
            <p>Time Start: {startTime} </p>
            <p>Time End: {endTime} </p>
            <p>Location/URL: {session.location} </p>
            <p>Current Capacity: {session.enrolled}</p>
            <p>Max Capacity: {session.capacity}</p>
            <p>Study Expert: {session.tutor}</p>
            <p>Comments: {this.comments}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewSlot;
