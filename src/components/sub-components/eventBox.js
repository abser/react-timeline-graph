import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
// import {Link} from 'react-router-dom'
import moment from 'moment';

const EventBox = (props) => {
	const {session} = props;
	// const startTime = session.startTime;
	// const endTime = session.endTime;
	let startTime =	moment(session.startTime, "HH:mm").format("hh:mm A");
	let endTime =	moment(session.endTime, "HH:mm").format("hh:mm A");

	return(
		<Row className="event-box">
			<Col xs={6} sm={6} md={6}> 
				<span className="title">
				{session.title}
				</span>
				<br/>
				{`${startTime} to ${endTime}`}
				{/*<Link to="#">{session.title}</Link></span> <br /> {`${startTime} to ${endTime}`}*/}
			</Col>
			<Col xs={6} sm={6} md={6}>
			"some information ..."
			</Col>
		</Row>
)
} 
export default EventBox;