import React from 'react';
import './SessionList.css'
import {militaryToStandard, isOnline, getMonthName} from "../DateTimeUtil"

class SessionList extends React.Component {
	render() {
		const { sessions, classFilter, examFilter, selectedSessionUpdate } = this.props;

		const sessionList = sessions.entries
			.filter((session) => {
				return (session.class_name.indexOf(classFilter) >= 0) &&
				(session.exam_num.toString().indexOf(examFilter) >= 0);
			})
			.map((session) => {
				const locType = isOnline(session.location) ? 'Online' : 'In-Person';
				const month = getMonthName(session.date.substr(5,2));
				const day = session.date.substr(8);
				const start_time = militaryToStandard(session.start);
				const end_time = militaryToStandard(session.end);
				return (
					<button key={session._id} onClick={() => selectedSessionUpdate(session._id)}>
						<p>Exam {session.exam_num} Review</p>
						<p>{session.class_name}</p>
						<p>{session.tutor}</p>
						<p>{month} {day}</p>
						<p>{start_time} - {end_time}</p>
						<p>{locType}</p>
						<p>{session.enrolled}/{session.capacity} slots left!</p>
					</button>
				);
			});
			//console.log('session list', sessionList)
			return <div>{sessionList}</div>
	}
}

export default SessionList;