import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectCoordinates, selectPositionError} from "../position/positionSlice";
import {useGetClosestStopsQuery} from "../stop/stopApi";
import {Accordion} from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";
import ClosestStops from '../stop/ClosestStops'
import StopMap from "../map/StopMap";


const Home: React.FC = () => {
    const coords = useAppSelector(selectCoordinates)
    const isError = useAppSelector(selectPositionError)
    const {data, error, isLoading} = useGetClosestStopsQuery(coords)

    if (isError || error) {
        return <>Failed to load data</>
    }

    return (
        <LoadingSpinner isLoading={isLoading}>
            <p>Latitude: {coords.latitude}</p>
            <p>Longitude: {coords.longitude}</p>

            <Accordion defaultActiveKey={"map"}>
                <Accordion.Item key={"map"} eventKey={"map"}>
                    <Accordion.Header>Map</Accordion.Header>
                    <Accordion.Collapse eventKey={"map"}>
                        <StopMap/>
                    </Accordion.Collapse>
                </Accordion.Item>
                {data && <ClosestStops closestStops={data}/>}
            </Accordion>
        </LoadingSpinner>
    )
}

export default Home