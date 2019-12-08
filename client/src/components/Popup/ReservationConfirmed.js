import React from 'react'
import './Popup.css'
import {militaryToStandard, isOnline, getMonthName} from "../DateTimeUtil";

// this popup simply tells the user they have succesfully signed up for a slot
// it includes all the session info they might need
class ReservationConfirmed extends React.Component {
    render() {
        const { closePopup, text, session, email } = this.props;

        // now that the user has signed up, they get to see the actual location of the session
        // either tell them its a link or physical location based on the location
        const locLabel = isOnline(session.location) ? 'link: ' : 'location: ';
        const startDate = new Date(session.start);
        const endDate = new Date(session.end);
        const month = getMonthName(startDate.getMonth() + 1);
        const day = startDate.getDate();
        const startTime = militaryToStandard(startDate.getHours(), startDate.getMinutes());
        const endTime = militaryToStandard(endDate.getHours(), endDate.getMinutes());

        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    X
                </div>
                <h1>{text}</h1>
                <div className="popup_inner">
                    <div className="message">
                        <p>A confirmation email has been sent to: {email}</p>
                        <p/>
                        <p>Review details: </p>
                        <p>{session.class} Exam {session.exam_num}</p>
                        <p>Session details: {session.description}</p>
                        <p>{session.tutor}</p>
                        <p>{month} {day}</p>
                        <p>{startTime} - {endTime}</p>
                        <p>{locLabel} {session.location}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReservationConfirmed;