import React from 'react'
import {Accordion} from 'react-bootstrap'
import StopDisplay from './StopDisplay'
import {ClosestStop} from './stopSlice' 

interface ClosestStopProps {
    closestStop: ClosestStop,
    index: number
}

const ClosestStopDisplay: React.FC<ClosestStopProps> = ({closestStop, index}) => {
    return (
        <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>({closestStop.distance} m) {closestStop.stop.stopDesc} {closestStop.stop.stopCode}</Accordion.Header>
            <Accordion.Collapse eventKey={index.toString()}>
                <StopDisplay stop={closestStop.stop}/>
            </Accordion.Collapse>
        </Accordion.Item>
    )
}

export default ClosestStopDisplay 