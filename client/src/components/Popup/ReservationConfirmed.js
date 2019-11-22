import React from 'react'
import './Popup.css'
import militaryToStandard from "../TimeUtility";

class ReservationConfirmed extends React.Component {
    render() {
        const { closePopup, text, session } = this.props;
        const start_dt_split = session.start.split(" ");
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
                        <p>Session details:</p>
                        <p>{session.class} Exam {session.exam_num}</p>
                        <p>{session.tutor}</p>
                        <p>{start_dt_split[0]} {start_dt_split[1]}</p>
                        <p>{start_time} - {end_time}</p>
                        <p>location: PLACE/URL</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReservationConfirmed;