import React from "react";
import "./SessionList.css";
import { militaryToStandard, isOnline, getMonthName } from "../DateTimeUtil";

class SessionList extends React.Component {
  render() {
    const {
      sessions,
      classFilter,
      examFilter,
      selectedSessionUpdate
    } = this.props;

    // initialize the list of study sessions as an empty list
    // check if there exists at least one session/the app has finished getting the sesssion list
    let sessionList = [];
    if (sessions.length > 0) {
      // filter based on the class name and exam number
      sessionList = sessions
        .filter(session => {
          return (
            session.class.indexOf(classFilter) >= 0 &&
            session.exam_num.toString().indexOf(examFilter) >= 0
          );
        })
          // set up the location, date, and time variables to be returned
        .map(session => {
          //console.log('sess:', session);
          // display only whether or not the session is online, not the actual location
          const locType = isOnline(session.location) ? "Online" : "In-Person";
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
            <button
              key={session._id}
              onClick={() => selectedSessionUpdate(session._id)}
            >
              <p>Exam {session.exam_num} Review</p>
              <p>{session.class}</p>
              <p>Study Expert Name: {session.tutor}</p>
              <p>
                {month} {day}
              </p>
              <p>
                {startTime} - {endTime}
              </p>
              <p>{locType}</p>
              <p>
                {session.capacity - session.enrolled} of {session.capacity} slots left!
              </p>
            </button>
          );
        });
    }
    //console.log('session list', sessionList)
    return <div>{sessionList}</div>;
  }
}

export default SessionList;
