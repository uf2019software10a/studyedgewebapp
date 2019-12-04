import React from 'react';
import './SessionList.css'
import {militaryToStandard, isOnline, getMonthName} from "../DateTimeUtil"

class SessionList extends React.Component {
	render() {
		const { sessions, classFilter, examFilter, selectedSessionUpdate } = this.props;

		let sessionList = [];
		if(typeof(sessions) !== 'undefined') {
			var sessionsCpy = [...this.props.sessions];
			if(sessionsCpy)
			sessionList = sessionsCpy
				.filter((session) => {
					return (session.class.indexOf(classFilter) >= 0) &&
						(session.exam_num.toString().indexOf(examFilter) >= 0);
				})
				.map((session) => {
					//console.log('sess:', session);
					const locType = isOnline(session.location) ? 'Online' : 'In-Person';
					const startDate = new Date(session.start);
					const endDate = new Date(session.end);
					const month = getMonthName(startDate.getMonth() + 1);
					const day = startDate.getDate();
					const startTime = militaryToStandard(startDate.getHours(), startDate.getMinutes());
					const endTime = militaryToStandard(endDate.getHours(), endDate.getMinutes());

					return (
						<button key={session._id} onClick={() => selectedSessionUpdate(session._id)}>
							<p>Exam {session.exam_num} Review</p>
							<p>{session.class}</p>
							<p>Study Expert Name: {session.tutor}</p>
							<p>{month} {day}</p>
							<p>{startTime} - {endTime}</p>
							<p>{locType}</p>
							<p>{session.enrolled} of {session.capacity} slots left!</p>
						</button>
					);
				});
		}
			//console.log('session list', sessionList)
			return <div>{sessionList}</div>
	}
}

export default SessionList;
