import React from 'react';
import './SessionList.css'

class SessionList extends React.Component {
	render() {
		const { sessions, classFilter, examFilter, selectedSessionUpdate } = this.props;

		const sessionList = sessions.entries
			.filter((session) => {
				return (session.class.indexOf(classFilter) >= 0) &&
				(session.exam_num.toString(10).indexOf(examFilter) >= 0);
			})			
			.map((session) => {
				let locType = '';
				if(session.online) {
					locType = 'Online';
				} else {
					locType = 'In-person';
				}
				const start_dt_split = session.start.split(" ");
				const end_dt_split = session.end.split(" ");
				return (
					<button onClick={() => selectedSessionUpdate(session.exam_id)}>
						<p>Exam {session.exam_num} Review</p>
						<p>{session.class}</p>
						<p>{session.tutor}</p>
						<p>{start_dt_split[0]} {start_dt_split[1]}</p>
						<p>{start_dt_split[3]} - {end_dt_split[3]}</p>
						<p>{locType}</p>
						<p>{session.enrolled}/10 slots left!</p>
					</button>
				);
			});
			//console.log('session list', sessionList)
			return <div>{sessionList}</div>
	}
}

export default SessionList;