import React from 'react'
import './Popup.css'
import {militaryToStandard, getMonthName} from "../DateTimeUtil";

class ViewSlot extends React.Component {
    render() {
        const { closePopup, session } = this.props;

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
                <h1>View Slot</h1>
                <div className='popup_inner'>
                    <div className='message'>
                        <p>Class: {session.class_name}</p>
                        <p>Exam: {session.exam_num} </p>
                        <p>Description: {session.description} </p>
                        <p>Date: {month} {day} </p>
                        <p>Time Start: {startTime} </p>
                        <p>Time End: {endTime} </p>
                        <p>Location/URL: {session.location} </p>
                        <p>Current Capacity: {session.enrolled}</p>
                        <p>Max Capacity: {session.capacity}</p>
                        <p>Tutor: {session.tutor}</p>
                        <p>------------------------</p>
                        <p>Comments: {/*TODO: get all exam comments*/}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSlot;