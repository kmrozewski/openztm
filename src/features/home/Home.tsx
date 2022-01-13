import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectCoordinates, selectPositionError} from "../position/positionSlice";
import {useGetClosestStopsQuery} from "../stop/stopApi";
import {Accordion} from "react-bootstrap";
import StopDisplay from "../stop/StopDisplay"
import LoadingSpinner from "../common/LoadingSpinner";

const Home: React.FC = () => {
    const coords = useAppSelector(selectCoordinates)
    const isError = useAppSelector(selectPositionError)
    const {data, error, isLoading} = useGetClosestStopsQuery(coords)

    if (isError || error) {
        return <>Failed to load data</>
    }

    return (
        <LoadingSpinner isLoading={isLoading}>
            <div>Hello world</div>
            <p>Latitude: {coords.latitude}</p>
            <p>Longitude: {coords.longitude}</p>

            <Accordion defaultActiveKey={"map"}>
                {/*<Accordion.Item key={"map"} eventKey={"map"}>*/}
                {/*    <Accordion.Header>Map</Accordion.Header>*/}
                {/*    <Accordion.Collapse eventKey={"map"}>*/}
                {/*        <StopMap/>*/}
                {/*    </Accordion.Collapse>*/}
                {/*</Accordion.Item>*/}
                {data?.map((closestStop, index) => {
                    return (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>({closestStop.distance} m) {closestStop.stop.stopDesc} {closestStop.stop.stopCode}</Accordion.Header>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <StopDisplay stop={closestStop.stop}/>
                            </Accordion.Collapse>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </LoadingSpinner>
    )
}

export default Home