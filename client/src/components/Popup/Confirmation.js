import React from 'react'
import './Popup.css'
import {militaryToStandard, isOnline, getMonthName} from "../DateTimeUtil"

class Confirmation extends React.Component {
    infoSubmitted = () => {
        const userEmailAddr = this.email.value;
        const specificTopicsPara = this.comments.value;
        console.log('my email: ', userEmailAddr);
        console.log('my comments: ', specificTopicsPara);
        this.props.emailUpdate(userEmailAddr);
        this.props.closePopup();
        // TODO: setup this boolean
        true ? this.props.openReservationConfirmedPopup() : this.props.openReservationErrorPopup();
    };

    render() {
        const { closePopup, text, session } = this.props;
        //console.log(session);
        const locType = isOnline(session.location) ? 'Online' : 'In-Person';
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
                <div className="popup_inner"
                style={{margin: '60px auto 0'}}>
                    <div className='sessionInfo'>
                        <p>Exam {session.exam_num} Review</p>
                        <p>{session.class_name}</p>
                        <p>Study Expert Name: {session.tutor}</p>
                        <p>{month} {day}</p>
                        <p>{startTime} - {endTime}</p>
                        <p>{locType}</p>
                        <p>{session.enrolled} of {session.capacity} slots left!</p>
                    </div>
                    <div className="text">
                    <div className="text_box_label">
                        <form>
                            Name:
                            <input
                                style={ {height : 20} }
                                type="text"
                                ref={ (name) => this.name = name}
                            />
                        </form>
                    </div>
                        <div className="text_box_label">
                            <form>
                                Preferred email:
                                <input
                                    style={ {height : 20} }
                                    type="text"
                                    ref={ (email) => this.email = email}
                                />
                            </form>
                        </div>
                        <div className="text_box_label">
                            <form>
                            Topics to Cover:
                                <input
                                    style={ {height : 80} }
                                    type="text"
                                    ref={ (comments) => this.comments = comments}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="confirm" onClick={() => this.infoSubmitted()}>
                    Book Now
                </div>
            </div>
        );
    }
}

export default Confirmation;
