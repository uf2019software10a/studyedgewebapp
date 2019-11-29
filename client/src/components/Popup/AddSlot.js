import React from 'react'
import './Popup.css'
import './PopupMenu/PopupMenu'
import PopupMenu from "./PopupMenu/PopupMenu";

class AddSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionMonth: '',
            startHour: '',
            startMinute: '',
            startPeriod: '',
            endHour: '',
            endMinute: '',
            endPeriod: '',
        }
    }

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];

    updateMonth = (newMonth) => {
        let monthNumeric = String(this.months.indexOf(newMonth) + 1);
        if(monthNumeric < 10) {
            monthNumeric = '0' + monthNumeric;
        }
        //console.log(monthNumeric);
        this.setState({sessionMonth : monthNumeric });
    };

    updateStartHour = (newHour) => {
        this.setState({startHour : newHour})
    };

    updateStartMinute = (newMin) => {
        this.setState({startMinute : newMin})
    };

    updateStartPeriod = (newPer) => {
        this.setState({startPeriod : newPer})
    };

    updateEndHour = (newHour) => {
        this.setState({endHour : newHour})
    };

    updateEndMinute = (newMin) => {
        this.setState({endMinute : newMin})
    };

    updateEndPeriod = (newPer) => {
        this.setState({endPeriod : newPer})
    };

    infoSubmitted = () => {
        // the session object should be used to create an instance of the exam session schema
        let dayNumeric = String(this.day.value);
        if(dayNumeric < 10) {
            dayNumeric = '0' + dayNumeric;
        }
        const session = {
            className: this.className.value,
            examNum: this.examNum.value,
            description: this.description.value,
            date: this.year.value + '-' + this.state.sessionMonth + '-' + dayNumeric,
            startTime: this.state.startHour + ':' + this.state.startMinute + ' ' + this.state.startPeriod,
            endTime: this.state.endHour + ':' + this.state.endMinute + ' ' + this.state.endPeriod,
            location: this.location.value,
            maxCapacity: this.capacity.value,
            tutor: this.tutor.value
        };
        console.log(session);
        this.props.closePopup();
    };

    render() {
        const { closePopup } = this.props;

        const hours = ['1', '2', '3', '4', '5', '6',
        '7', '8', '9', '10', '11', '12'];
        const minutes = ['00', '15', '30', '45'];
        const periods = ['AM', 'PM'];

        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    Back
                </div>
                <h1>Add Slot</h1>
                <div className='popup_inner'>
                    <div className='message'>
                        <div className='input_label_admin'>
                            <form>
                                Class
                                <input
                                    style={ { height: 20} }
                                    type='text'
                                    ref={(className) => this.className = className}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                Exam
                                <input
                                    style={ { height: 20} }
                                    type='text'
                                    ref={(examNum) => this.examNum = examNum}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                Description
                                <input
                                    style={ { height: 20} }
                                    type='text'
                                    ref={(description) => this.description = description}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                Date
                                <PopupMenu
                                    title='Month'
                                    list={this.months}
                                    filterUpdate={this.updateMonth.bind(this)}
                                />
                                <input
                                    style={ { height: 20, width: 60} }
                                    type='text'
                                    placeholder='day'
                                    ref={(day) => this.day = day}
                                />
                                <input
                                    style={ { height: 20, width: 60, margin: '0 100px 0'} }
                                    type='text'
                                    placeholder='year'
                                    ref={(year) => this.year = year}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                Start Time
                                <PopupMenu
                                    title='Hour'
                                    list={hours}
                                    filterUpdate={this.updateStartHour.bind(this)}
                                />
                                <PopupMenu
                                    title='Minute'
                                    list={minutes}
                                    filterUpdate={this.updateStartMinute.bind(this)}
                                />
                                <PopupMenu
                                    title='AM/PM'
                                    list={periods}
                                    filterUpdate={this.updateStartPeriod.bind(this)}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                End Time
                                <PopupMenu
                                    title='Hour'
                                    list={hours}
                                    filterUpdate={this.updateEndHour.bind(this)}
                                />
                                <PopupMenu
                                    title='Minute'
                                    list={minutes}
                                    filterUpdate={this.updateEndMinute.bind(this)}
                                />
                                <PopupMenu
                                    title='AM/PM'
                                    list={periods}
                                    filterUpdate={this.updateEndPeriod.bind(this)}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                Location/URL
                                <input
                                    style={ { height: 20} }
                                    type='text'
                                    ref={(location) => this.location = location}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                Max Capacity
                                <input
                                    style={ { height: 20} }
                                    type='text'
                                    ref={(capacity) => this.capacity = capacity}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                Tutor Name
                                <input
                                    style={ { height: 20} }
                                    type='text'
                                    ref={(tutor) => this.tutor = tutor}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="confirm" onClick={() => this.infoSubmitted()}>
                    Add Slot
                </div>
            </div>
        )
    }
}

export default AddSlot;