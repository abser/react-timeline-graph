import React, { Component } from 'react';
import {
	Table
	// ButtonGroup,
	//  Glyphicon 
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import HourCell from './hourCell';
import XAxisLabel from './xAxisLabel';


class HorizontalTimeLine extends Component {
	constructor(props) {
		super(props);
		this.renderAgain = this._renderAgain.bind(this);
	}

	componentDidMount() {
		window.addEventListener("resize", this.renderAgain)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.renderAgain)
	}

	render() {
		const { events } = this.props;
		// console.log(this.state);
		const n = events.length;
		if (n < 1) { return <div>No data to show!</div>; }
		// console.log("Here n is ", n );
		const eventGroups = this._eventsGroupByHour(events);
		let tableData = this._calculateTableData(events);
		let tableProps = this._calculateTableProps(tableData.graphColumN);
		
		// console.log("n,graphStartHour, graphEndHour, graphColumN, columnHeight", n,graphStartHour, graphEndHour, graphColumN, columnHeight);
		let theGraph = (
			<Table responsive
				style={{
					width: tableProps.tableWidth,
					background: "#F8FAFB"
				}}>
				<tbody>
					<tr>
						{this._drawDataColumns(
							tableData.graphStartHour,
							tableData.graphEndHour,
							eventGroups,
							tableData.columnHeight,
							tableProps.tableWidth,
							tableProps.cellWidth,
							tableProps.oneMinToPixel
						)}

					</tr>
					<tr>
						{this._drawLabelColumns(
							tableData.graphStartHour,
							tableData.graphEndHour,
							tableProps.cellWidth
						)}
					</tr>
				</tbody>
			</Table>
			);
		
		const bar =
			<div>
				{theGraph}
			</div>
		return (bar);
	}

	_renderAgain() {
		this.forceUpdate();
	}

	_calculateTableProps(columnN) {
		let screenWidth = window.innerWidth;
		let tableWidth = null;
		let cellWidth = null;	
		let cellWidthInPercent = null;
		let containerWidth = null;
		let oneMinToPixel = null;
		let bordersSizes = columnN + 1;

			switch (true) {
				case (screenWidth >= 1200):
					containerWidth = 1170;
					tableWidth = containerWidth - 30 - bordersSizes;
					cellWidth = tableWidth / columnN;
					cellWidthInPercent = (cellWidth * 100)/tableWidth
					oneMinToPixel = cellWidth / 60;
					break;
				case ((screenWidth >= 992) && (screenWidth < 1200)):
					containerWidth = 970;
					tableWidth = containerWidth - 30 - bordersSizes;
					cellWidth = tableWidth / columnN;
					cellWidthInPercent = (cellWidth * 100)/tableWidth
					oneMinToPixel = cellWidth / 60;
					break;
				case ((screenWidth >= 768) && (screenWidth < 992)):
					containerWidth = 720;
					tableWidth = containerWidth - 30 - bordersSizes;
					cellWidth = (tableWidth) / columnN;
					cellWidthInPercent = (cellWidth * 100)/tableWidth
					oneMinToPixel = cellWidth / 60;
					// console.log(cellWidth);
					break;
				default:
					containerWidth = screenWidth - 30;
					tableWidth = containerWidth - 30 - bordersSizes;
					cellWidth = (tableWidth) / columnN;
					cellWidthInPercent = (cellWidth * 100)/tableWidth
					oneMinToPixel = cellWidth / 60;
					// console.log(cellWidth); 
					break;
			}
			// console.log("screenWidth", screenWidth);
			// console.log("tableWidth", tableWidth);
			// console.log("cellWidth", cellWidth);
			// console.log("oneMinToPixel", oneMinToPixel);
			return {
				cellWidth: cellWidth,
				cellWidthInPercent: cellWidthInPercent,
				oneMinToPixel: oneMinToPixel, // 30 for bootstrappadding + 30 addintional padding
				tableWidth: tableWidth
			}
	}

	_calculateTableData(events) {
			// console.log(events);
			const n = events.length;
			const firstEventST = events[0].start;
			const firstEventStartHM = firstEventST.split(':');
			const graphStartHour = parseInt(firstEventStartHM[0], 10) < 8 ? firstEventStartHM[0] : 8;
			const lastEventET = events[n - 1].end;
			// console.log(lastEventET);
			const lastEventEndHM = lastEventET.split(':');
			const graphEndHour = parseInt(lastEventEndHM[0], 10) < 20 ? 20 : parseInt(lastEventEndHM[0], 10) + 1
			const graphColumN = (graphEndHour - graphStartHour) +1;
			// console.log(graphColumN)
			const columnHeight = `${(n * 45) + 45}px`;
			return {
				graphStartHour,
				graphEndHour,
				graphColumN,
				columnHeight
			}
	}

	_timeDiffInPixel(startTime, EndTime, oneMinToPixel) {
		let s = moment(startTime, 'HH:mm');
		let e = moment(EndTime, 'HH:mm');
		let difInMin = e.diff(s, 'minutes');
		return difInMin * oneMinToPixel;
	}
	_drawDataColumns(startHour, endHour, eventGroups, height, tableWidth, cellWidth, oneMinToPixel) {
		// console.log("startHour, endHour, eventGroups, height", startHour, endHour, eventGroups, height);
		let i = startHour;
		let columns = [];
		let top = 10;
		while (i <= endHour) {
			let leftWidth = eventGroups[i] ?
				this._timeDiffInPixel(startHour, (eventGroups[i][0]).start, oneMinToPixel) : 0;
			let boxWidth = tableWidth - leftWidth;
			columns.push(
				<HourCell
					key={`${i}-hour-cell`}
					height={height}
					width={cellWidth}
					boxWidth={boxWidth}
					oneMinToPixel={`${oneMinToPixel}`}
					top={`${top}px`}
					events={eventGroups[i]}
				/>
			);
			top = eventGroups[i] ?
				top + (eventGroups[i].length) * 50 :
				top + 15;
			i++;
		}
		return columns;
	}

	_drawLabelColumns(startHour, endHour, cellWidth, interval = 2) {
		let i = startHour;
		let columns = [];
		while (i <= endHour) {
			// console.log("i <= endHour", i, endHour);
			columns.push(
				<XAxisLabel
					key={`${i}-lebel-cell`}
					label={i % interval === 0 ? i : ""}
					width={cellWidth}
				/>
			);
			i++;
		}
		return columns;
	}

	_eventsGroupByHour(events) {
		let orderEvents = _.orderBy(events, event => {
			return [event.startHour, event.start]
		}, ['asc', 'asc']);
		return _.groupBy(orderEvents, event => event.startHour)
	}

}

export default HorizontalTimeLine;
