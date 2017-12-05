import React from 'react';
import {Image, Grid, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import _ from 'lodash';
import blankImg from '../img/blank-img.png';

const EventSpeaker = (props) => {
	const speakers = props.speakers
	if(!speakers) { return null}
	// console.log(speakers);
	// let speakerList = [];
	const spkLi = speakers.map(speaker => 
		(	
		<Row className="event-speaker" key={`${speaker.ID}`}>
			<Col xs={4} sm={2} md={1}>
			<Link to={`/speaker/${speaker.ID}`}>
			<Image className="img_60_60" src={speaker.speaker_photo ? speaker.speaker_photo : blankImg} circle/>
			</Link>
			</Col>
			<Col xs={8} sm={10} md={11}>
			<Link to={`/speaker/${speaker.ID}`}><strong>{speaker.post_title}</strong></Link>
			<br/>{speaker.meta.speakertitle}
			<br/>{speaker.meta.speakerurltext}
			</Col>
		</Row>
		));
	return (<Grid>{spkLi}</Grid>)
}
export default EventSpeaker;