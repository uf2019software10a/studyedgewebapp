import React from 'react'
import './Popup.css'
import {militaryToStandard, isOnline, getMonthName} from "../DateTimeUtil";

class ReservationConfirmed extends React.Component {
    render() {
        const { closePopup, text, session } = this.props;

        const locLabel = isOnline(session.location) ? 'link: ' : 'location: ';
        const month = getMonthName(session.date.substr(5,2));
        const day = session.date.substr(8);

        const start_time = militaryToStandard(session.start);
        const end_time = militaryToStandard(session.end);

        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    Back
                </div>
                <h1>{text}</h1>
                <div className="popup_inner">
                    <div className="message">
                        <p>A confirmation email has been sent to: </p>
                        <p>PLACEHOLDER EMAIL</p>
                        <p>--------------</p>
                        <p>{session.class_name} Exam {session.exam_num}</p>
                        <p>Session details: {session.description}</p>
                        <p>{session.tutor}</p>
                        <p>{month} {day}</p>
                        <p>{start_time} - {end_time}</p>
                        <p>{locLabel} {session.location}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReservationConfirmed;