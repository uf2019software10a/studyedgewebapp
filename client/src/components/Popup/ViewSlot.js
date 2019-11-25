import React from 'react'
import './Popup.css'
import militaryToStandard from "../TimeUtility";

class ViewSlot extends React.Component {
    render() {
        const { closePopup, text, session } = this.props;

        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    Back
                </div>
                <h1>{text}</h1>
                <div className='popup_inner'>
                    <div className='message'>
                        <p>Class: {session.class}</p>
                        <p>Exam: {session.exam_num} </p>
                        <p>Description: {session.description} </p>
                        <p>Date: {session.date} </p>
                        <p>Time Start: </p>
                        <p>Time End: </p>
                        <p>Location: </p>
                        <p>Current Capacity: </p>
                        <p>Tutor: </p>
                        <div>
                            Comments:
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSlot;