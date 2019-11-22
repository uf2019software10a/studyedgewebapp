import React from 'react'
import './Popup.css'

class ReservationError extends React.Component {
    render() {
        const { closePopup, text } = this.props;
        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    Back
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