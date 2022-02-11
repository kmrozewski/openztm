import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectPositionError} from "../position/positionSlice";
import {Accordion} from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";
import ClosestStops from '../stop/ClosestStops'
import StopMap from "../map/StopMap";
import {selectClosestStops, selectClosestStopsStatus} from "../stop/stopSlice";


const Home: React.FC = () => {
    const isError = useAppSelector(selectPositionError)
    const closestStops = useAppSelector(selectClosestStops)
    const status = useAppSelector(selectClosestStopsStatus)

    if (isError || status === "failed") {
        return <>Failed to load data</>
    }

    return (
        <LoadingSpinner isLoading={status === "loading"}>
            <Accordion defaultActiveKey={"map"}>
                <Accordion.Item key={"map"} eventKey={"map"}>
                    <Accordion.Header>Map</Accordion.Header>
                    <Accordion.Collapse eventKey={"map"}>
                        <StopMap/>
                    </Accordion.Collapse>
                </Accordion.Item>
                {closestStops && <ClosestStops closestStops={closestStops}/>}
            </Accordion>
        </LoadingSpinner>
    )
}

export default Home