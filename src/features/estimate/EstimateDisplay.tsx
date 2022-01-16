import React from "react";
import {Stop} from "../stop/stopApi";
import {useGetEstimatesByIdQuery} from './estimateApi'
import {Card} from "react-bootstrap";
import {timeFormat} from "../common/utils";

export interface StopProps {
    stop: Stop
}

const EstimateDisplay: React.FC<StopProps> = (props) => {
    const {data, error} = useGetEstimatesByIdQuery(props.stop.stopId)

    if (!data || data.length === 0) {
        return <>No estimates found</>
    }

    if (error) {
        return <>Failed to load estimates</>
    }

    return (
        <>
            {data.map((estimate, index) => {
                return (
                    <Card key={index} bg={estimate.delayInSeconds < 0 ? "danger" : "success"}>
                        <Card.Body>
                            <Card.Title>{estimate.routeId}: {estimate.headsign}</Card.Title>
                            <Card.Subtitle>{estimate.estimatedTime ? timeFormat(estimate.estimatedTime) : timeFormat(estimate.theoreticalTime)}</Card.Subtitle>
                            <Card.Link>Bus position</Card.Link>
                        </Card.Body>
                    </Card>
                )
            })}
        </>
    )
}

export default EstimateDisplay