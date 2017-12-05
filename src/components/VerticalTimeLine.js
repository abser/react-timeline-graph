import React, { Component } from 'react';
import _ from 'lodash';
import './css/style.css';
import EventBox from './sub-components/eventBox';

/**
 * sessions: list of events in JSON format. Need to pass as props
 * from your component
 */

class VerticalTimeLine extends Component {
	constructor(props) {
		super(props);
		const { sessions } = props;
		this.state = {
			sessions: sessions
		}
		this.drawTimeLine = this._drawTimeLine.bind(this);
	}

	render() {
		if ((this.state.sessions).length < 1) {
			return (<div>No data to show!</div>);
		}
		return (this.drawTimeLine());
	}

	/**
	 * 
	 */
	_drawTimeLine() {
		let timeLineItems = [];
		const _sessionsGroupByStartTime = _.groupBy(this.state.sessions, 
			session => session.startTime);
		_.mapKeys(_sessionsGroupByStartTime, (sessions, startTime) => {
			let eventBoxes = [];
			let _sessions = sessions.length > 0 ? 
				_.orderBy(sessions, sess => [sess.endTime], ['asc']) 
				: sessions;
			_.map(_sessions, session => {
				// let roomId = parseInt(session.meta.cr3ativ_conflocation[0], 10);
				// let roomName = null;
				// if (roomId > -1) {
				// 	let room = _.find(this.props.rooms, { ID: roomId });
				// 	roomName = room ? room.post_title : null;
				// }
				eventBoxes.push(
					<EventBox
						key={session.ID}
						session={session}
					/>)
			});
			timeLineItems.push(
				<li key={startTime}>
					<span></span>
					{eventBoxes}
					<span className="number">
						<span>{startTime}</span>
					</span>
				</li>
			);
		});

		const timeLine = (
			<div className="box">
				<ul>
					{timeLineItems}
				</ul>
			</div>
		);
		return timeLine;
	}

	componentWillReceiveProps(newProps) {
		if (this.state.sessions !== newProps.sessions) {
			this.setState({
				sessions: newProps.sessions
			})
		}
	}
}

export default VerticalTimeLine;