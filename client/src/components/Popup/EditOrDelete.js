import React from 'react'
import './Popup.css'
import './PopupMenu/PopupMenu'
import PopupMenu from "./PopupMenu/PopupMenu";
import axios from 'axios';
import {
    months, hours, minutes, periods,
    getMonthNumber, getMonthName, getHour, getPeriod, getMinute
} from "../DateTimeUtil"

class EditOrDelete extends React.Component {
    defaultStartDate = new Date(this.props.session.start);
    defaultEndDate = new Date(this.props.session.end);
    ID = this.props.session._id;

    constructor(props) {
        super(props);
        this.state = {
            sessionMonth: this.defaultStartDate.getMonth() + 1,
            startHour: getHour(this.defaultStartDate.getHours()),
            startMinute: this.defaultStartDate.getMinutes(),
            startPeriod: getPeriod(this.defaultStartDate.getHours()),
            endHour: getHour(this.defaultEndDate.getHours()),
            endMinute: this.defaultEndDate.getMinutes(),
            endPeriod: getPeriod(this.defaultStartDate.getHours()),
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

    editSession = () => {
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

        axios.put(`/api/exams/id=${this.ID}`, {
            class: this.className.value,
            exam_num: this.examNum.value,
            description: this.description.value,
            start: startDate,
            end: endDate,
            location: this.location.value,
            capacity: this.capacity.value,
            tutor: this.tutor.value,
            enrolled: this.props.session.enrolled
        })
            .then((res) => {
                console.log('RESPONSE DATA: ', res.data)
            }).catch((error) => {
            console.log(error);
        });

        this.props.closePopup();
    };

    deleteSession = () => {
        console.log(this.props.session);
        // delete exam session in database with same _id
        //const URL = '/api/exams/className=:' + this.props.session.class + ',examNum=:' + this.props.session.exam_num;
        //console.log(URL);
        axios.delete(`/api/exams/id=${this.ID}`)
            .then((res) => {
                console.log('RESPONSE: ', res);
                console.log('RESPONSE DATA: ', res.data);
            }).catch((error) => {
                console.log(error);
        });
        this.props.closePopup();
    };

    render() {
        const { session, closePopup } = this.props;

        return (
            <div className='popup'>
                <div className='close' onClick={() => closePopup()}>
                    X
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
                                    defaultValue={session.class}
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
                                    title={getMonthName(this.defaultStartDate.getMonth() + 1)}
                                    list={months}
                                    filterUpdate={this.updateMonth.bind(this)}
                                />
                                <input
                                    style={ { height: 20, width: 60} }
                                    type='text'
                                    placeholder='day'
                                    ref={(day) => this.day = day}
                                    defaultValue={this.defaultStartDate.getDate()}
                                />
                                <input
                                    style={ { height: 20, width: 60, margin: '0 100px 0'} }
                                    type='text'
                                    placeholder='year'
                                    ref={(year) => this.year = year}
                                    defaultValue={this.defaultStartDate.getFullYear()}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                Start Time
                                <PopupMenu
                                    title={getHour(this.defaultStartDate.getHours())}
                                    list={hours}
                                    filterUpdate={this.updateStartHour.bind(this)}
                                />
                                <PopupMenu
                                    title={getMinute(this.defaultStartDate.getMinutes())}
                                    list={minutes}
                                    filterUpdate={this.updateStartMinute.bind(this)}
                                />
                                <PopupMenu
                                    title={getPeriod(this.defaultStartDate.getHours())}
                                    list={periods}
                                    filterUpdate={this.updateStartPeriod.bind(this)}
                                />
                            </form>
                        </div>
                        <div className='input_label_admin'>
                            <form>
                                End Time
                                <PopupMenu
                                    title={getHour(this.defaultEndDate.getHours())}
                                    list={hours}
                                    filterUpdate={this.updateEndHour.bind(this)}
                                />
                                <PopupMenu
                                    title={getMinute(this.defaultEndDate.getMinutes())}
                                    list={minutes}
                                    filterUpdate={this.updateEndMinute.bind(this)}
                                />
                                <PopupMenu
                                    title={getPeriod(this.defaultEndDate.getHours())}
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
                    <div className='confirm' onClick={() => this.editSession()}>
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
