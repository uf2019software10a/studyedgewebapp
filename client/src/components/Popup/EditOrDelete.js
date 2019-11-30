import React from 'react'
import './Popup.css'
import './PopupMenu/PopupMenu'
import PopupMenu from "./PopupMenu/PopupMenu";
import {months, hours, minutes, periods, getMonthNumber, getMonthName} from "../DateTimeUtil"

class EditOrDelete extends React.Component {
    defaultDate = this.props.session.date.split('-');

    constructor(props) {
        super(props);
        this.state = {
            sessionMonth: this.defaultDate[1],
            startHour: '',
            startMinute: '',
            startPeriod: '',
            endHour: '',
            endMinute: '',
            endPeriod: '',
        }
    }

    updateMonth = (newMonth) => {
        let monthNumeric = getMonthNumber(newMonth);
        if(monthNumeric < 10 && monthNumeric >= 0) {
            monthNumeric = '0' + monthNumeric;
        }
        //console.log(monthNumeric);
        this.setState({sessionMonth : monthNumeric });
    };

    updateStartHour = (newHour) => {
        this.setState({startHour : parseInt(newHour)})
    };

    updateStartMinute = (newMin) => {
        this.setState({startMinute : parseInt(newMin)})
    };

    updateStartPeriod = (newPer) => {
        this.setState({startPeriod : newPer})
    };

    updateEndHour = (newHour) => {
        this.setState({endHour : parseInt(newHour)})
    };

    updateEndMinute = (newMin) => {
        this.setState({endMinute : parseInt(newMin)})
    };

    updateEndPeriod = (newPer) => {
        this.setState({endPeriod : newPer})
    };

    infoSubmitted = () => {
        // the session object should be used to create an instance of the exam session schema
        // trim() sanitizes any whitespace at the start of end of the string
        let dayNumeric = (String(this.day.value)).trim();
        if(dayNumeric < 10 && dayNumeric !== '') {
            dayNumeric = '0' + dayNumeric;
        }
        const yearNumeric = (String(this.year.value).trim());
        const session = {
            class_name: this.className.value,
            exam_num: this.examNum.value,
            description: this.description.value,
            date: yearNumeric + '-' + this.state.sessionMonth + '-' + dayNumeric,
            start_time: {
                start_hr: this.state.startHour,
                start_min: this.state.startMinute,
                start_per: this.state.startPeriod
            },
            end_time: {
                end_hr: this.state.endHour,
                end_min: this.state.endMinute,
                start_per: this.state.startPeriod
            },
            location: this.location.value,
            capacity: this.capacity.value,
            tutor: this.tutor.value,
        };
        console.log(session);
        // edit exam session in database that matches the relevant _id
        // TODO
        this.props.closePopup();
    };

    deleteSession = () => {
        // delete exam session in database with same _id
        // TODO
        this.props.closePopup();
    };

    render() {
        const { session, closePopup } = this.props;

        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    Back
                </div>
                <h1>Edit/Delete Slot</h1>
                <div className='popup_inner'>
                    <div className='message'>
                        <div className='input_label_admin'>
                            <form>
                                Class
                                <input
                                    style={ { height: 20} }
                                    type='text'
                                    ref={(className) => this.className = className}
                                    defaultValue={session.class_name}
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
                                    defaultValue={session.exam_num}
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
                                    defaultValue={session.description}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                Date
                                <PopupMenu
                                    title={getMonthName(this.defaultDate[1])}
                                    list={months}
                                    filterUpdate={this.updateMonth.bind(this)}
                                />
                                <input
                                    style={ { height: 20, width: 60} }
                                    type='text'
                                    placeholder='day'
                                    ref={(day) => this.day = day}
                                    defaultValue={this.defaultDate[2]}
                                />
                                <input
                                    style={ { height: 20, width: 60, margin: '0 100px 0'} }
                                    type='text'
                                    placeholder='year'
                                    ref={(year) => this.year = year}
                                    defaultValue={this.defaultDate[0]}
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
                                    defaultValue={session.location}
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
                                    defaultValue={session.capacity}
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
                                    defaultValue={session.tutor}
                                />
                            </form>
                        </div>
                    </div>
                    <div className='confirm' onClick={() => this.infoSubmitted()}>
                        Update
                    </div>
                </div>
                <div className='delete' onClick={() => this.deleteSession()}>
                    Delete
                </div>
            </div>
        )
    }
}

export default EditOrDelete;