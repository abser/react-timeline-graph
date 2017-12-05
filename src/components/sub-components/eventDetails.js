import React, { Component } from 'react';
import { Glyphicon, Image} from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import '../css/style.css';
import EventSpeakers from './eventSpeakers';
/**
 * EventDetails Component
 * Accept 2 url params: roomId and sessionId
 */
class EventDetails extends Component {

	render() {
		// console.log(this.props)
		const session = this.props.session;
		if(!session) {
			return (
				<div style={{textAlign:'center', paddingTop: "30px"}}>No Events!</div>
			)
		}
		const location = this.props.room ? this._roomDetails(this.props.room) : null;
		
		return (
			<div>
			<h2>{session.post_title}</h2>
			<p>
			{`${moment.unix(session.meta.cr3ativconfmeetingdate[0]).format("DD MMM")}, 
			${session.meta.cr3ativ_confstarttime}
			To ${session.meta.cr3ativ_confendtime}`}
			<br/>
			{location && 
			<span>
				<Glyphicon glyph="map-marker" className="icon" />
					{location.post_title}
			</span> 
			}
			</p> 
			<br/>
			{ session.post_content &&
			<div>
			<h3 className="section-heading">Description:</h3>
			<div className="event-description" dangerouslySetInnerHTML={{__html:session.post_content}}/>
			<br/>
			</div>
			}

			{session.meta.cr3ativ_confspeaker &&
				<div>
				<h3 className="section-heading">Speakers:</h3>
				<EventSpeakers
					speakers={this._eventSpeakers(session.meta.cr3ativ_confspeaker)}
				/>
				</div>
			}
			<br/>
			{session.presentation &&
			<div>	
				<h3>Presentation File:</h3>
					<a target="blank" href={session.presentation}>{session.presentation}</a>
			</div>
			}
			{location && location.location_map &&
				<div>
				<h3 className="section-heading">Location Map:</h3>
				<Image src={location.location_map} responsive/>
				</div>
			}
			</div>
	);
	}

	_eventSpeakers(spkIds) {
		const _spkIds = JSON.parse(spkIds);
		let speakers = [];
		// console.log(_spkIds)
		_.map(_spkIds, spkId => {
			// console.log(spkId)
			let speaker = _.find(this.props.speakers, speaker => speaker.ID == spkId);
			// console.log(speaker);
			speakers.push(speaker);
		} )
		return speakers.length > 0 ? speakers : null
	}

	_roomDetails(roomId) {
		return _.find(this.props.rooms, room => room.ID == roomId);
	}

}

function mapStateToProps(state) {
	return { 
		rooms: state.data.rooms,
		speakers: state.data.speakers,
	 }
}

export default connect(mapStateToProps)(EventDetails);
