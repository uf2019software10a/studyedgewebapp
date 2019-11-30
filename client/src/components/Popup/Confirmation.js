import React from 'react'
import './Popup.css'
import militaryToStandard from "../TimeUtility"

class Confirmation extends React.Component {
    infoSubmitted = () => {
        const userEmailAddr = this.email.value;
        const specificTopicsPara = this.comments.value;
        console.log('my email: ', userEmailAddr);
        console.log('my comments: ', specificTopicsPara);
        this.props.closePopup();
    };

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
                    X
                </div>
               <h1></h1>
                <div className="popup_inner">
                    <div className='sessionInfo'>
                        <p>Exam {session.exam_num} Review</p>
                        <p>{session.class}</p>
                        <p>Study Expert Name: {session.tutor}</p>
                        <p>{start_dt_split[0]} {start_dt_split[1]}</p>
                        <p>{start_time} - {end_time}</p>
                        <p>{locType}</p>
                        <p>{session.enrolled} of {session.capacity} Slots Left!</p>
                        <p>{session.description}</p>
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
                                    style={ {height : 100} }
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
