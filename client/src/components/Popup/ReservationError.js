import React from 'react'
import './Popup.css'

// this popup simply tells the user that they cannot sign up for this exam,
// because they have already signed up for a study session for this particular exam
class ReservationError extends React.Component {
    render() {
        const { closePopup, text } = this.props;
        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    X
                </div>
                <h1>{text}</h1>
                <div className="popup_inner">
                    <div className="message">
                        <p>You have already signed up for this exam.</p>
                        <p>You can only attend one review per exam.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReservationError;