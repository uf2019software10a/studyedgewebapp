import React from 'react'
import './Popup.css'
import militaryToStandard from "../TimeUtility"

class Confirmation extends React.Component {
    render() {
        const { closePopup, text, session } = this.props;
        //console.log(session);
        let locType = '';
        if(session.online) {
            locType = 'Online';
        } else {
            locType = 'In-person';
        }
        const start_dt_split = session.start.split(" ");
        const start_time = militaryToStandard(session.start);
        const end_time = militaryToStandard(session.end);
        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    Go Back
                </div>
                <h1>{text}</h1>
                <div className="popup_inner">
                    <div className='sessionInfo'>
                        <p>Exam {session.exam_num} Review</p>
                        <p>{session.class}</p>
                        <p>{session.tutor}</p>
                        <p>{start_dt_split[0]} {start_dt_split[1]}</p>
                        <p>{start_time} - {end_time}</p>
                        <p>{locType}</p>
                        <p>{session.enrolled}/{session.capacity} slots left!</p>
                    </div>
                    <div className="text">
                        placeholder
                    </div>
                </div>
                <div className="confirm">
                    Sign Up
                </div>
            </div>
        );
    }
}

export default Confirmation;
