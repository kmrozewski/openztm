import React, {useEffect} from "react";
import {useAppSelector} from "../../app/hooks";
import {selectCoordinates, selectPositionError} from "../position/positionSlice";
import {useGetClosestStopsMutation} from "../stop/stopApi";
import {Accordion} from "react-bootstrap";
import StopDisplay from "../stop/StopDisplay"
import StopMap from "../stop/StopMap";

const Home: React.FC = () => {
    const coords = useAppSelector(selectCoordinates)
    const isError = useAppSelector(selectPositionError)
    const [getStops, {isLoading}] = useGetClosestStopsMutation()

    useEffect(() => {
        const call = async () => await getStops(coords)
        const response = call()
        console.log('response', response)

    }, [coords])

    if (isLoading) {
        return <>Loading...</>
    }

    if (isError) {
        return <>Failed to load data</>
    }

    return (
        <>
            <div>Hello world</div>
            <p>Latitude: {coords.latitude}</p>
            <p>Longitude: {coords.longitude}</p>

            <Accordion defaultActiveKey={"map"}>
                <Accordion.Item key={"map"} eventKey={"map"}>
                    <Accordion.Header>Map</Accordion.Header>
                    <Accordion.Collapse eventKey={"map"}>
                        <StopMap/>
                    </Accordion.Collapse>
                </Accordion.Item>
                {/*{stops.map((stop, index) => {*/}
                {/*    return (*/}
                {/*        <Accordion.Item key={index} eventKey={index.toString()}>*/}
                {/*            <Accordion.Header>({stop.distance} m) {stop.stop.stopDesc} {stop.stop.stopCode}</Accordion.Header>*/}
                {/*            <Accordion.Collapse eventKey={index.toString()}>*/}
                {/*                <StopDisplay stop={stop.stop}/>*/}
                {/*            </Accordion.Collapse>*/}
                {/*        </Accordion.Item>*/}
                {/*    )*/}
                {/*})}*/}
            </Accordion>
        </>
    )
}

export default Home