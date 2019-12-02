import React from 'react'
import './Popup.css'
import './PopupMenu/PopupMenu'
import PopupMenu from "./PopupMenu/PopupMenu";
import {months, hours, minutes, periods, getMonthNumber} from "../DateTimeUtil"

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

    updateMonth = (newMonth) => {
        const monthNumeric = getMonthNumber(newMonth);
        //console.log(monthNumeric);
        this.setState({sessionMonth : monthNumeric});
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
        const dayNumeric = (String(this.day.value)).trim();
        const yearNumeric = (String(this.year.value).trim());
        const startDate = new Date(this.state.sessionMonth + ' ' + dayNumeric + ' ' + yearNumeric + ' ' +
            this.state.startHour + ':' + this.state.startMinute + ' ' + this.state.startPeriod);
        const endDate = new Date(this.state.sessionMonth + ' ' + dayNumeric + ' ' + yearNumeric + ' ' +
            this.state.endHour + ':' + this.state.endMinute + ' ' + this.state.endPeriod);
        //console.log(startDate);
        //console.log(endDate);

        const session = {
            class: this.className.value,
            exam_num: this.examNum.value,
            description: this.description.value,
            start: startDate,
            end: endDate,
            location: this.location.value,
            capacity: this.capacity.value,
            tutor: this.tutor.value,
        };
        console.log(session);
        // TODO: create exam session in database
        this.props.closePopup();
    };

    render() {
        const { closePopup } = this.props;

        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    X
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
                                    list={months}
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