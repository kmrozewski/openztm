import React from 'react'
import {Accordion} from 'react-bootstrap'
import EstimateDisplay from '../estimate/EstimateDisplay'
import {ClosestStop} from './stopSlice' 

interface ClosestStopProps {
    closestStop: ClosestStop
}

const ClosestStopDisplay: React.FC<ClosestStopProps> = ({closestStop}) => {
    const stop = closestStop.stop
    const stopId = stop.stopId.toString()

    return (
        <Accordion.Item key={stopId} eventKey={stopId}>
            <Accordion.Header>({closestStop.distance} m) {stop.stopDesc} {stop.stopCode}</Accordion.Header>
            <Accordion.Collapse eventKey={stopId}>
                <EstimateDisplay stop={stop}/>
            </Accordion.Collapse>
        </Accordion.Item>
    )
}

export default ClosestStopDisplay 